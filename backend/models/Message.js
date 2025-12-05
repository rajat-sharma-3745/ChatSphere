import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        channelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            required: true,
            index: true,
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        content: {
            type: String,
            required: true,
            trim: true,
        },

    },
    { timestamps: true }
);

messageSchema.index({ channelId: 1, createdAt: -1 });

export default mongoose.model("Message", messageSchema);
