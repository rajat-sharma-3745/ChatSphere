import { MEMBER_JOINED, MEMBER_LEAVED } from "../constants/events.js";
import Channel from "../models/Channel.js";
import Message from "../models/Message.js";
import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/errorHandler.js";


export const createChannel = asyncHandler(async (req, res, next) => {
    const { name, description, isPrivate } = req.body;

    if (name === "") {
        return next(new ApiError("Channel name is required", 400));
    }

    const channel = await Channel.create({
        name,
        description: description || "",
        isPrivate: isPrivate || false,
        createdBy: req.userId,
        members: [req.userId],
    });

    res.status(201).json({
        success: true,
        message: "Channel created successfully",
        channel,
    });
});


export const joinChannel = asyncHandler(async (req, res, next) => {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId);
    if (!channel) {
        return next(new ApiError("Channel not found", 404));
    }

    if (channel.members.includes(req.userId)) {
        return next(new ApiError("You are already a member of this channel", 400));
    }

    channel.members.push(req.userId);
    await channel.save();
    const populatedMember = await User.findById(req.userId).select("username");

    const io = req.app.get('io')
    io.to(channel._id.toString()).emit(MEMBER_JOINED, {
        channelId: channel._id,
        member: {
            _id: populatedMember._id,
            username: populatedMember.username,

        }
    });

    res.status(200).json({
        success: true,
        message: "Joined channel successfully",
        channel
    });
});


export const leaveChannel = asyncHandler(async (req, res, next) => {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId);
    if (!channel) {
        return next(new ApiError("Channel not found", 404));
    }

    if (!channel.members.includes(req.userId)) {
        return next(new ApiError("You are not a member of this channel", 400));
    }

    channel.members = channel.members.filter(
        (m) => m.toString() !== req.userId.toString()
    );

    await channel.save();

    const io = req.app.get('io')

    io.to(channel._id.toString()).emit(MEMBER_LEAVED, {
        channelId: channel._id,
        memberId: req.userId
    });

    res.status(200).json({
        success: true,
        message: "Left channel successfully",
        channel
    });
});


export const getAllChannels = asyncHandler(async (req, res, next) => {
    const channels = await Channel.find({
        members: { $ne: req.userId }
    }).sort({ createdAt: -1 });

    res.status(200).json({ channels });
});


export const getMyChannels = asyncHandler(async (req, res, next) => {
    const channels = await Channel.find({
        members: req.userId,
    }).populate("members", "username").sort({ createdAt: -1 });

    res.status(200).json({ channels });
});


export const getChannelById = asyncHandler(async (req, res, next) => {
    const channelId = req.params.id;

    const channel = await Channel.findById(channelId).populate(
        "members",
        "username"
    );

    if (!channel) {
        return next(new ApiError("Channel not found", 404));
    }

    res.status(200).json({ channel });
});


export const getMessages = asyncHandler(async (req, res, next) => {
    const { channelId } = req.params;
    let { page = 1 } = req.query;
    const limit = 10;
    page = parseInt(page);

    if (page < 1) {
        return next(new ApiError("Page must be positive numbers", 400));
    }

    const skip = (page - 1) * limit;

    const messages = await Message.find({ channelId })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("sender", "username");

    const totalMessages = await Message.countDocuments({ channelId });

    res.status(200).json({
        page,
        limit,
        totalMessages,
        totalPages: Math.ceil(totalMessages / limit),
        messages: messages.reverse(),
    });


})