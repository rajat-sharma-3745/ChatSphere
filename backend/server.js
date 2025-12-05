import express from 'express'
import 'dotenv/config'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import http from 'node:http'
import { errorMiddleware } from './middlewares/error.js';
import { connectDb } from './config/db.js';
import userRoutes from "./routes/userRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import { Server } from 'socket.io'
import { socketAuth } from './middlewares/auth.js'
import { CHANNEL_JOINED, CHANNEL_LEAVED, NEW_MESSAGE, ONLINE_USERS, START_TYPING, STOP_TYPING } from './constants/events.js'
import { randomUUID } from 'node:crypto'
import { getSockets } from './utils/helper.js'
import Message from './models/Message.js'



const app = express();
app.use(express.json());


app.use(cookieParser());
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))


app.get('/', (req, res) => {
    res.send('Api is working');
})

app.use("/users", userRoutes);
app.use("/channels", channelRoutes);


const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: process.env.CLIENT_URL,
        credentials: true,
    },
})

app.set('io',io);
export const userSocketMap = new Map();
const onlineUsers = new Set();


io.use((socket, next) => {
    cookieParser()(socket.request, socket.request.res, async (err) => {
        await socketAuth(err, socket, next);
    })
})

io.on("connection", (socket) => {
    const user = socket.user;
    userSocketMap.set(user._id.toString(), socket.id);
    onlineUsers.add(user._id.toString())
    io.emit(ONLINE_USERS, Array.from(onlineUsers));

    socket.on(NEW_MESSAGE, async ({ channelId, message }) => {
        const messageForRealTime = {
            _id: randomUUID(),
            content: message,
            sender: {
                _id: user._id,
                username: user.username,
            },
            channelId: channelId,
            createdAt: new Date().toISOString(),
        }
        io.to(channelId).emit(NEW_MESSAGE, { channelId, message: messageForRealTime })

        const messageForDB = {
            content: message,
            sender: user?._id,
            channelId: channelId
        }

        try {
            await Message.create(messageForDB)
        } catch (error) {
            console.error(error);
        }

    })

    socket.on(START_TYPING, ({ channelId, username }) => {
        socket.to(channelId).emit(START_TYPING, {
            channelId,
            username
        })
    })
    socket.on(STOP_TYPING, ({ channelId, username }) => {
        socket.to(channelId).emit(STOP_TYPING, {
            channelId
        });
    });

    socket.on(CHANNEL_JOINED, (channelId) => {
        socket.join(channelId);
        console.log(`User ${socket.id} joined channel: ${channelId}`);
    });

    socket.on(CHANNEL_LEAVED, (channelId) => {
        socket.leave(channelId);
        console.log(`User ${socket.id} left channel: ${channelId}`);
    });

    socket.on('disconnect', () => {
        userSocketMap.delete(user._id.toString())
        onlineUsers.delete(user._id.toString());
        io.emit(ONLINE_USERS, Array.from(onlineUsers))
    })

})


const PORT = process.env.PORT || 3000;

app.use(errorMiddleware)
connectDb().then(() =>
    server.listen(PORT, () => console.log("Server running on port ", PORT)))