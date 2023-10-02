"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostRoute = exports.getPostsRoute = exports.writePostRoute = exports.signUpRoute = void 0;
const user_1 = require("../../../controllers/user");
function signUpRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { email, name, password } = req.body;
            const result = yield (0, user_1.signUp)(email, name, password);
            return res.status(result.status).json(result);
        }
        catch (err) {
            return res.status(500).json({
                message: err,
                success: false,
                status: 500,
                data: null
            });
        }
    });
}
exports.signUpRoute = signUpRoute;
function writePostRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { title, content } = req.body;
            const { id } = res.locals.user;
            const result = yield (0, user_1.writePost)(title, content, id);
            return res.status(result.status).json(result);
        }
        catch (err) {
            return res.status(500).json({
                message: err,
                success: false,
                status: 500,
                data: null
            });
        }
    });
}
exports.writePostRoute = writePostRoute;
function getPostsRoute(_req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = res.locals.user;
            const result = yield (0, user_1.getPosts)(id);
            return res.status(result.status).json(result);
        }
        catch (err) {
            return res.status(500).json({
                message: err,
                success: false,
                status: 500,
                data: null
            });
        }
    });
}
exports.getPostsRoute = getPostsRoute;
function deletePostRoute(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { id } = req.params;
            const result = yield (0, user_1.deletePost)(id);
            return res.status(result.status).json(result);
        }
        catch (err) {
            return res.status(500).json({
                message: err,
                success: false,
                status: 500,
                data: null
            });
        }
    });
}
exports.deletePostRoute = deletePostRoute;
