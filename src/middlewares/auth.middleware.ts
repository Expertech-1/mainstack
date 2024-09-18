import { Request, Response, NextFunction } from "express";
import { verifyJwt } from "../utils/jwt.utils";
import { User } from "../models/user.model";
import { JwtPayload } from "jsonwebtoken"; 

const authorizeUser = async (
    req: Request, 
    res: Response, 
    next: NextFunction
) => {
    const authorizationHeader = req.headers.authorization || req.headers.Authorization as string;
    const accessToken = authorizationHeader?.replace(/^Bearer\s/, "");

    if (!accessToken) {
        return res.status(401).json({ message: 'You are not signed in. Please log in first.' });
    }

    const { valid, expired, decoded } = verifyJwt(accessToken);
    if (valid && !expired && decoded && typeof decoded !== 'string') {
        const { id } = decoded as JwtPayload;  
        const user = await User.findById(id);
        if (!user) {
            return res.status(401).json({ message: 'User not found. Please log in again.' });
        }
        res.locals.user = user;
        return next();
    }

    if (expired) {
        return res.status(403).json({ message: 'Invalid or expired token. Please log in again.' });
    }

    return res.status(403).json({ message: 'Invalid token.' });
};

export default authorizeUser;
