import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
    {
        roomName: { type: String, required: true, unique: true },
        password: { type: String, required: false },
        ownerId: { type: String, required: false },
        status: {
            type: String,
            enum: ["empty", "waiting for enemy", "active"],
            required: true,
            default: "empty",
        },
        player: { type: String, required: false },
    },
    { timestamps: true }
);

export const Room = mongoose.model("Room", roomSchema);
