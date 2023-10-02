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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.getPosts = exports.writePost = exports.signUp = void 0;
const prisma_1 = __importDefault(require("../database/prisma"));
const requestsSchemas_1 = require("../types/requestsSchemas");
const functions_1 = require("../utils/functions");
const signUp = (email, name, password) => __awaiter(void 0, void 0, void 0, function* () {
    // first validate the request body with zod
    // if the validation fails, send a 400 response
    const validationResult = requestsSchemas_1.signUpBodySchema.safeParse({
        email,
        name,
        password,
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        };
    }
    // hash the password
    const hashedPassword = yield (0, functions_1.hashPassword)(password);
    const created = yield prisma_1.default.user.create({
        data: {
            email: email,
            name: name,
            password: hashedPassword,
        }
    });
    return {
        message: "User created successfully",
        success: true,
        status: 201,
        data: created
    };
});
exports.signUp = signUp;
const writePost = (title, content, authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = requestsSchemas_1.writePostBodySchema.safeParse({
        title,
        content,
        authorId
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        };
    }
    const created = yield prisma_1.default.post.create({
        data: {
            title,
            content,
            authorId
        }
    });
    return {
        message: "Post created successfully",
        success: true,
        status: 201,
        data: created
    };
});
exports.writePost = writePost;
const getPosts = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = requestsSchemas_1.getPostsQuerySchema.safeParse({
        authorId
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        };
    }
    const _authorId = authorId;
    const posts = yield prisma_1.default.post.findMany({
        where: {
            authorId: _authorId,
        }
    });
    return {
        message: "Posts retrieved successfully",
        success: true,
        status: 200,
        data: posts
    };
});
exports.getPosts = getPosts;
const deletePost = (postId) => __awaiter(void 0, void 0, void 0, function* () {
    const validationResult = requestsSchemas_1.deletePostQuerySchema.safeParse({
        postId
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        };
    }
    const post = yield prisma_1.default.post.findUnique({
        where: {
            id: postId,
        }
    });
    if (!post) {
        return {
            message: "Post not found",
            success: false,
            status: 404,
            data: null
        };
    }
    const deleted = yield prisma_1.default.post.delete({
        where: {
            id: postId,
        }
    });
    return {
        message: "Post deleted successfully",
        success: true,
        status: 200,
        data: deleted
    };
});
exports.deletePost = deletePost;
