import { Response } from "express";

import { generateToken } from "../utils/tokenUtils";

export function sendDataToClient(res: Response, id: string, username: string) {
    const token = generateToken(id);

    res.json({
        token,
        username,
    });
}
