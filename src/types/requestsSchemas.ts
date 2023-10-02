import { z } from "zod";
import { passwordRegex } from "../utils/commons";

export const signUpBodySchema = z.object({
    email: z.string().email(),
    password: z.string().regex(passwordRegex),
    name: z.string().min(3),
});

export type SignUpBody = z.infer<typeof signUpBodySchema>;

export const writePostBodySchema = z.object({
    title: z.string().min(3),
    content: z.string().min(3),
    authorId: z.string(),
});

export type WritePostBody = z.infer<typeof writePostBodySchema>;

export const getPostsQuerySchema = z.object({
    authorId: z.string(),
});

export type GetPostsQuery = z.infer<typeof getPostsQuerySchema>;

export const deletePostQuerySchema = z.object({
    postId: z.string().uuid(),
});

export type DeletePostQuery = z.infer<typeof deletePostQuerySchema>;