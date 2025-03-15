import { Response, Request, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
    user?: any;
}

export const authMiddleware = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        res.json({ message: "No token provided" });
        return;
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        res.json({ message: "Server error: missing JWT_SECRET" });
        return;
    }

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            res.json({ message: "Invalid token" });
        }
        req.user = decoded;
        next();
    });

    return;
};
