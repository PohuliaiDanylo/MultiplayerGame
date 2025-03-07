import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";

dotenv.config();

export const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", authRouter);
