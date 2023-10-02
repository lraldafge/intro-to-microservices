import dotenv from "dotenv"
dotenv.config()
import express from "express"
import request from "supertest"
import routes from "../drivers/webserver/routers"
import {
    beforeAll,
    describe,
    expect,
    test
} from "@jest/globals"
import config from "../config"
import jwt from "jsonwebtoken"
import prisma from "../database/prisma"

const app = express();
app.use(express.json());
app.use(routes);
const ids = [] as string[];

beforeAll(async () => {
    await prisma.post.deleteMany();
    await prisma.user.deleteMany();
});

describe('Testing the user functionalities', () => {
    test('Should create a new user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: "123456789",
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);

        const response = await request(app)
            .post('/signup')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: "myemail@email.com",
                name: "myname",
                password: "AVery$trongP@ssword123"
            });
        const { message, success, status, data } = response.body;
        expect(status).toBe(201);
        expect(success).toBe(true);
        expect(message).toBe("User created successfully");
        expect(data).toHaveProperty("id");
        ids.push(data.id);

    });
    test('Should not create a new user with a repeated email', async () => {
        // Define the authorization token
        const token = jwt.sign({
            email: "myemail@email.com",
            name: "myname",
            password: "AVery$trongP@ssword123"
        }, config.funtecSecret);
        const response = await request(app)
            .post('/signup')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: "myemail@email.com",
                name: "myname",
                password: "AVery$trongP@ssword123"
            });
        const { success, status, data } = response.body;
        expect(status).toBe(500);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
    test('Should not create a new user with a weak password', async () => {
        // Define the authorization token
        const token = jwt.sign({
            email: "anewemail@email.com",
            name: "anewname",
            password: "AVery$trongP@ssword123"
        }, config.funtecSecret);
        const response = await request(app)
            .post('/signup')
            .set('Authorization', `Bearer ${token}`)
            .send({
                email: "anewemail@email.com",
                name: "anewname",
                password: "weakpassword"
            });
        const { success, status, data } = response.body;
        expect(status).toBe(400);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
    test('Should write a post from the first user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: ids[0],
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .post('/post')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "My title",
                content: "My content"
            });
        const { message, success, status, data } = response.body;
        expect(message).toBe("Post created successfully");
        expect(status).toBe(201);
        expect(success).toBe(true);
        ids.push(data.id);
    });
    test('Should not write a post from a non-existent user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: "123456789",
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .post('/post')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "My title",
                content: "My content"
            });
        const { success, status, data } = response.body;
        expect(status).toBe(500);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
    test('Should not write a post if the validation schema fails', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: 123,
            email: "jadlsf@mail.com",
            name: "jadlsf"
        }, config.funtecSecret);
        const response = await request(app)
            .post('/post')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "My",
                content: "My content"
            });
        const { success, status, data } = response.body;
        expect(status).toBe(400);
        expect(success).toBe(false);
        expect(data).toBe(null);
    })
    test('Should get all posts from the first user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: ids[0],
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .get('/posts')
            .set('Authorization', `Bearer ${token}`);
        const { message, success, status, data } = response.body;
        expect(message).toBe("Posts retrieved successfully");
        expect(status).toBe(200);
        expect(success).toBe(true);
        expect(data.length).toBe(1);
    });
    test('Should not get posts from a non-existent user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: 123456,
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .get('/posts')
            .set('Authorization', `Bearer ${token}`);
        const { success, status, data } = response.body;
        expect(status).toBe(400);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
    test('Should delete a post from the first user', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: ids[0],
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .delete(`/post/${ids[1]}`)
            .set('Authorization', `Bearer ${token}`)
        const { message, success, status, data } = response.body;
        expect(message).toBe("Post deleted successfully");
        expect(status).toBe(200);
        expect(success).toBe(true);
    });
    test('Should not delete a non existent post', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: 123456,
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .delete(`/post/acde070d-8c4c-4f0d-9d8a-162843c10333`)
            .set('Authorization', `Bearer ${token}`)
        const { success, status, data } = response.body;
        expect(status).toBe(404);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
    test('Should not delete a post with a wrong param', async () => {
        // Define the authorization token
        const token = jwt.sign({
            id: 123456,
            email: "someemail@email.com",
            name: "some name"
        }, config.funtecSecret);
        const response = await request(app)
            .delete(`/post/{}`)
            .set('Authorization', `Bearer ${token}`)
        const { success, status, data } = response.body;
        expect(status).toBe(400);
        expect(success).toBe(false);
        expect(data).toBe(null);
    });
});
describe('JWT testing', () => {
    test("Should not create a new user without token", async () => {
        try {
            await request(app)
                .post('/signup')
                .send({
                    email: "someemail@email.com",
                    name: "some name",
                    password: "AVery$trongP@ssword123"
                });
        } catch (error: any) {
            expect(error.message).toBe("Authentication required");
        }

    })
    test("Should not create a new user with an invalid token", async () => {
        try {
            const token = jwt.sign({
                id: "123456789",
                email: "asdfdas@gmail.com",
                name: "some name"
            }, "invalidSecret");
            await request(app)
                .post('/signup')
                .set('Authorization', `Bearer ${token}`)
                .send({
                    email: "asdfsd@gmail.com",
                    name: "some name",
                    password: "AVery$trongP@ssword123"
                });
        } catch (error: any) {
            expect(error.message).toBe("Invalid token");
        }
    });
})