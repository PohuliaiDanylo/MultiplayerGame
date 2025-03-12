import express, { Response } from "express";
import { User } from "../models/user";

import { AuthRequest } from "../middlewares/authmiddleware";

const router = express.Router();

router.get("/getData", async (req: AuthRequest, res: Response) => {
    const userId = req.user.userId;
    const existingUser = await User.findById(userId);
    if (!existingUser) {
        res.json({ message: "session expired" });
        return;
    }
    res.json({ username: existingUser.username });
});

export default router;
