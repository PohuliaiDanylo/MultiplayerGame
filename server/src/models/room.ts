import mongoose, { ObjectId } from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomName: { type: String, required: true },
        password: { type: String, required: false },
        ownerId: { type: String, required: true },
        ownerUsername: { type: String, required: true },
        status: {
            type: String,
            enum: ["empty", "waiting for enemy", "active"],
            required: true,
            default: "waiting for enemy",
        },
        players: [{ type: String }],
    },
    { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
