import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../config"

export const jwtMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        // if there is no token, return an error
        return next(new Error('Authentication required'));
    }
    // if there is a token, verify it
    const decoded = jwt.verify(token, config.funtecSecret);
    // if the token is invalid, return an error
    if (!decoded) {
        return next(new Error('Invalid token'));
    }
    // if the token is valid, set the user in the request object
    res.locals.user = JSON.parse(JSON.stringify(decoded));
    return next();
}