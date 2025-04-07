import { Server, Socket } from "socket.io";
import { Room } from "../models/room";

export function handleRoomSockets(io: Server, socket: Socket) {
    async function updateRoomsList() {
        const updatedRooms = await Room.find();
        io.emit("roomsUpdated", updatedRooms);
    }

    socket.on("getRooms", async (callback) => {
        try {
            const rooms = await Room.find();
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
                    roomName: roomName,
                    ownerId: ownerId,
                    ownerUsername: ownerUsername,
                    players: [ownerId],
                };
                if (password) {
                    roomData.password = password;
                }
                const newRoom = new Room(roomData);
                await newRoom.save();
                callback({ message: "Room created", room: newRoom });

                updateRoomsList();
            } catch (error) {
                callback({ message: "Error occurred" });
            }
        }
    );
}
