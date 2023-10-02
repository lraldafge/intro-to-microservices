"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = __importDefault(require("../config"));
const jwtMiddleware = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        // if there is no token, return an error
        return next(new Error('Authentication required'));
    }
    // if there is a token, verify it
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.funtecSecret);
    // if the token is invalid, return an error
    if (!decoded) {
        return next(new Error('Invalid token'));
    }
    // if the token is valid, set the user in the request object
    res.locals.user = JSON.parse(JSON.stringify(decoded));
    return next();
};
exports.jwtMiddleware = jwtMiddleware;
