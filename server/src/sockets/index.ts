import { Server } from "socket.io";
import { handleRoomSockets } from "./roomSockets";

export function initSockets(server: any) {
    const io = new Server(server, {
        cors: { origin: process.env.CLIENT_URL || "http://localhost:5173" },
    });

    io.on("connection", (socket) => {
        handleRoomSockets(io, socket);
    });
}
