"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePostQuerySchema = exports.getPostsQuerySchema = exports.writePostBodySchema = exports.signUpBodySchema = void 0;
const zod_1 = require("zod");
const commons_1 = require("../utils/commons");
exports.signUpBodySchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().regex(commons_1.passwordRegex),
    name: zod_1.z.string().min(3),
});
exports.writePostBodySchema = zod_1.z.object({
    title: zod_1.z.string().min(3),
    content: zod_1.z.string().min(3),
    authorId: zod_1.z.string(),
});
exports.getPostsQuerySchema = zod_1.z.object({
    authorId: zod_1.z.string(),
});
exports.deletePostQuerySchema = zod_1.z.object({
    postId: zod_1.z.string().uuid(),
});
