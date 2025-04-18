import { Server, Socket } from "socket.io";
import { client } from "../config/redis";
import { nanoid } from "nanoid";
import { updateRoomsList } from "../utils/updateRoomsList";
import { subscriber } from "../config/redis";
import { getRooms } from "../utils/getRooms";

export function handleRoomSockets(io: Server, socket: Socket) {

    subscriber.subscribe('__keyevent@0__:expired', async (key) => {
        if (key.startsWith('room:')) {
            console.log('Room expired:', key);
            await client.sRem('rooms', key);
            updateRoomsList(io);
        }
    });

    socket.on("getRooms", async (callback) => {
        try {
            const rooms = await getRooms()
            callback({ message: "here are all the rooms", rooms: rooms });
        } catch (error) {
            callback({ message: "Error occurred" });
        }
    });
    socket.on(
        "createRoom",
        async (roomName, password, ownerId, ownerUsername, callback) => {
            try {
                const roomData: Record<string, any> = {
                    roomId: nanoid(),
                    roomName: roomName,
                    ownerId: ownerId,
                    ownerUsername: ownerUsername,
                    players: [ownerId],
                };
                if (password) {
                    roomData.password = password;
                }
                await client.hSet(`room:${roomData.roomId}`, {...roomData, players: JSON.stringify(roomData.players)})
                await client.expire(`room:${roomData.roomId}`, 10)

                await client.sAdd("rooms", `room:${roomData.roomId}`)
                callback({ message: "Room created", room: roomData });

                updateRoomsList(io);
            } catch (error) {
                callback({ message: "Error occurred" + error });
            }
        }
    );
    socket.on("join_room", (roomId, userId) => {
        socket.join(roomId);
    });
    socket.on("leave_room", (roomId, userId) => {
        socket.leave(roomId);
    });
}
