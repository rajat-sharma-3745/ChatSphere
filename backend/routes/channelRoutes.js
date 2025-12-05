import express from "express";
import {protect} from "../middlewares/auth.js";
import {
  createChannel,
  joinChannel,
  leaveChannel,
  getAllChannels,
  getMyChannels,
  getChannelById,
  getMessages
} from "../controllers/channelController.js";

const router = express.Router();

router.post("/create", protect, createChannel);

router.post("/:id/join", protect, joinChannel);

router.delete("/:id/leave", protect, leaveChannel);

router.get("/", protect, getAllChannels);

router.get("/my", protect, getMyChannels);

router.get("/:id", protect, getChannelById);

router.get('/message/:channelId',protect, getMessages)


export default router;
