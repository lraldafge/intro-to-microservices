import prisma from "../database/prisma";
import { deletePostQuerySchema, getPostsQuerySchema, signUpBodySchema, writePostBodySchema } from "../types/requestsSchemas";
import { hashPassword } from "../utils/functions";

export const signUp = async (email: string, name: string, password: string) => {
    // first validate the request body with zod
    // if the validation fails, send a 400 response
    const validationResult = signUpBodySchema.safeParse({
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
        }
    }
    // hash the password
    const hashedPassword = await hashPassword(password);
    const created = await prisma.user.create({
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
    }
}

export const writePost = async (title: string, content: string, authorId: string) => {
    const validationResult = writePostBodySchema.safeParse({
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
        }
    }
    const created = await prisma.post.create({
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
    }
}

export const getPosts = async (authorId: string) => {
    const validationResult = getPostsQuerySchema.safeParse({
        authorId
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        }
    }
    const _authorId = authorId as string;
    const posts = await prisma.post.findMany({
        where: {
            authorId: _authorId,
        }
    });
    return {
        message: "Posts retrieved successfully",
        success: true,
        status: 200,
        data: posts
    }
}

export const deletePost = async (postId: string) => {
    const validationResult = deletePostQuerySchema.safeParse({
        postId
    });
    if (!validationResult.success) {
        return {
            message: validationResult.error.message,
            success: false,
            status: 400,
            data: null
        }
    }
    const post = await prisma.post.findUnique({
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
        }
    }
    const deleted = await prisma.post.delete({
        where: {
            id: postId,
        }
    });
    return {
        message: "Post deleted successfully",
        success: true,
        status: 200,
        data: deleted
    }
}