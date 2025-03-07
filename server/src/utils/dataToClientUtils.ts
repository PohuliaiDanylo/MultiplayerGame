import { Response } from "express";

import { generateToken } from "../utils/tokenUtils";

export function sendDataToClient(res: Response, id: string, username: string) {
    const token = generateToken(id, username);

    res.json({
        token,
        user: { id: id, username: username },
    });
}
