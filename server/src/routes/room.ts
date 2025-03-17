import express, { Request, Response } from "express";
import { Room } from "../models/room";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
    try {
        const { roomName, password, ownerId } = req.body;
        const roomData: Record<string, string> = {
            roomName: roomName,
            ownerId: ownerId,
        };
        if (password) {
            roomData.password = password;
        }
        const newRoom = new Room(roomData);
        await newRoom.save();
        res.json({ message: "Room created", room: newRoom });
    } catch (error) {
        res.json({
            message: "Server Error",
        });
    }
});

export default router;
