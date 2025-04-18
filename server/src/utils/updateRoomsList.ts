import { Server} from "socket.io";
import { getRooms } from "./getRooms";

export async function updateRoomsList(io: Server) {
    const updatedRooms = await getRooms();
    io.emit("roomsUpdated", updatedRooms);
}