import { HTTP_STATUS_CODES } from "../utils";

import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/user";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.json({
                message: "Username used",
            });
            return;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        const token = jwt.sign(
            { userId: newUser._id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            token,
            user: { id: newUser._id, username: newUser.username },
        });
    } catch (error) {
        res.json({
            message: "Server Error",
        });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) {
            res.json({
                message: "Incorrent login or password",
            });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.json({
                message: "Incorrent login or password",
            });
            return;
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET as string,
            {
                expiresIn: "7d",
            }
        );

        res.json({
            token,
            user: { id: user._id, username: user.username },
        });
    } catch (error) {
        res.json({
            message: "Server Error",
        });
    }
});

export default router;
