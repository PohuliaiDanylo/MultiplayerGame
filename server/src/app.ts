import express from "express";

import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";
import authRouter from "./routes/auth";
import userRouter from "./routes/user";
import { authMiddleware } from "./middlewares/authmiddleware";

dotenv.config();

export const app = express();
export const server = createServer(app);

app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/user", authMiddleware, userRouter);