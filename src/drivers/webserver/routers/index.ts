import express from "express"
import { jwtMiddleware } from "../../../middlewares/auth"
import * as userRouter from "./user"

const router = express.Router();
// default route to test the server
router.get('/', (_req, res) => {
    res.send('Hello world!');
});
// user routes
router.post('/signup', jwtMiddleware, userRouter.signUpRoute);
router.post('/post', jwtMiddleware, userRouter.writePostRoute);
router.get('/posts', jwtMiddleware, userRouter.getPostsRoute);
router.delete('/post/:id', jwtMiddleware, userRouter.deletePostRoute);

export default router 