import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

export function authenticateJWT(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Token not provided" })
    }
    const [, token] = authorization.split(" ")

    try {
        const decoded = verify(token, process.env.JWT_SECRET as string)
        const { id } = decoded as TokenPayload;

        req.headers['userId'] = id;
        next()
    } catch (error) {
        return res.status(401).json({ error: "Token invalid" })
    }
}