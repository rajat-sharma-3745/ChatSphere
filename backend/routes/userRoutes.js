import express from "express";
import { registerUser, loginUser, logout } from "../controllers/userController.js";
import { protect } from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get('/logout',protect,logout);



export default router;
