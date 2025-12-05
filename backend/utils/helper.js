import { userSocketMap } from "../server.js";

export const getSockets = (users=[]) => {
    const sockets = users.map((user)=>userSocketMap.get(user.toString()));
    return sockets;
}