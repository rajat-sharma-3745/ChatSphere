import User from "../models/User.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendToken } from "../utils/feature.js";

export const registerUser = asyncHandler(async(req, res,next) => {
    const { username, email, password } = req.body;
    

    if ([username, email, password].some((f) => f === "")) {
        return next(new ApiError("All fields are required", 400));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return next(new ApiError("Email already registered", 400));
    }

    const user = await User.create({ username, email, password });

    sendToken(res, user, 201, "User created");
});


export const loginUser = asyncHandler(async (req, res,next) => {
    const { email, password } = req.body;

    if ([email, password].some((f) => f === "")) {
        return next(new ApiError("All fields are required", 400));
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user) {
        return next(new ApiError("Invalid email or password", 400));
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        return next(new ApiError("Invalid email or password", 400));
    }

    sendToken(res, user, 200, "Logged in successfully")
});

export const logout = asyncHandler(async (req, res, next) => {
    res.status(200).cookie('token', '', {
        maxAge: 0,
        httpOnly: true
    }).json({
        success: true,
        message: "Logged out successfully"
    })
})