import { client } from "../config/redis";

export async function getRooms() {
    const roomKeys = await client.sMembers("rooms")
    const rooms = []
    for (const key of roomKeys) {
        const room = await client.hGetAll(key)
        rooms.push(room)
    }
    return rooms
}