import { socket } from "../utils/socket";

export type Room = {
    _id?: string;
    roomName: string;
    password?: string;
    ownerId: string;
    ownerUsername: string;
    status: string;
    players?: string[];
};

export async function getRooms(
    setFunction: React.Dispatch<React.SetStateAction<Room[]>>
) {
    try {
        const response = await socket.emitWithAck("getRooms");
        if (!response.rooms) {
            alert(response.message);
        }
        setFunction(response.rooms);
    } catch (error) {
        alert("Error, try later");
    }
}
