import jwt from "jsonwebtoken";

export const generateToken = (userId: string, username: string) => {
    return jwt.sign(
        { userId: userId, username: username },
        process.env.JWT_SECRET as string,
        {
            expiresIn: "7d",
        }
    );
};
