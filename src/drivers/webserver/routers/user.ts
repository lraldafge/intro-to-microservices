import { signUp, deletePost, getPosts, writePost } from "../../../controllers/user";
import { Request, Response } from "express";

export async function signUpRoute(req: Request, res: Response) {
    try {
        const { email, name, password } = req.body;
        const result = await signUp(email, name, password);
        return res.status(result.status).json(result);
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
            status: 500,
            data: null
        })
    }
}

export async function writePostRoute(req: Request, res: Response) {
    try {
        const { title, content } = req.body;
        const { id } = res.locals.user;
        const result = await writePost(title, content, id);
        return res.status(result.status).json(result);
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
            status: 500,
            data: null
        })
    }
}

export async function getPostsRoute(_req: Request, res: Response) {
    try {
        const { id } = res.locals.user;
        const result = await getPosts(id as string);
        return res.status(result.status).json(result);
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
            status: 500,
            data: null
        })
    }
}

export async function deletePostRoute(req: Request, res: Response) {
    try {
        const { id } = req.params;
        const result = await deletePost(id);
        return res.status(result.status).json(result);
    } catch (err) {
        return res.status(500).json({
            message: err,
            success: false,
            status: 500,
            data: null
        })
    }
}

