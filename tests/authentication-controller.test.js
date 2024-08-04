const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const User = require('../models/User.js');

beforeAll(async () => {
    const dbURI = process.env.TEST_MONGODB_URI;
    await mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
});

describe('POST /auth/register', () => {
    it('Should register a new user', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: "Testuser98",
                password: "TestPassword123!"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('Should register a new user with 4 characters as username', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: "Te98",
                password: "TestPassword123!"
            });

        expect(response.statusCode).toBe(201);
        expect(response.body).toHaveProperty('message', 'User registered successfully');
    });

    it('Should not register a new user due to incorrect username format', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: "Tezs",
                password: "TestPassword123!"
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username must contain at least one number!')
    });

    it('Should not register a new user with empty username field', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: '',
                password: "TestPassword123!"
            });
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username cannot be empty')
    });

    it('Should not register a use with username less than 4 characters', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'asd',
                password: 'TestPassword123!'
            });

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username must be at least 4 characters long!')
    });

    it('Should not register a username containing special characters', async () => {
        const response = await request(app)
            .post('/auth/register')
            .send({
                username: 'asdasd@',
                password: 'TestPassword123!'
            })
        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Username must contain only letters and numbers!');
    });

})

describe('POST /auth/login', () => {
    beforeEach(async () => {
        await request(app)
            .post('/auth/register')
            .send({
                username: "Testuser98",
                password: "TestPassword123!"
            })
    });

    it('Should login with the correct format username and password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: "Testuser98",
                password: "TestPassword123!"
            })

        expect(response.statusCode).toBe(200);
        expect(response.body).toHaveProperty('token');
    });

    it('Should not login with incorrect username', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: "Tes",
                password: "TestPassword123!"
            })

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid username or password');
    });

    it('Should not login with incorrect password', async () => {
        const response = await request(app)
            .post('/auth/login')
            .send({
                username: "Testuser98",
                password: "TestPass"
            })

        expect(response.statusCode).toBe(400);
        expect(response.body).toHaveProperty('message', 'Invalid username or password');
    });

    describe('POST /auth/logout', () => {
        let token;
        beforeEach(async () => {
            await request(app)
                .post('/auth/register')
                .send({
                    username: "Testuser98",
                    password: "TestPassword123!"
                });

            const response = await request(app)
                .post('/auth/login')
                .send({
                    username: "Testuser98",
                    password: "TestPassword123!"
                });
            token = response.body.token
        });

        it('Should logout when there is a token', async () => {
            const response = await request(app)
                .post('/auth/logout')
                .set('Authorization', `Bearer ${token}`)
                .expect(200);

            expect(response.body).toHaveProperty('message', 'Successfully logged out.');
        });

        it('Should not logout when there is no token provided', async () => {
            const response = await request(app)
                .post('/auth/logout')
                .set('Authorization', ``)
                .expect(401);
            
            expect(response.body).toHaveProperty('message', 'Access denied. No token provided.');
        });

        it('Should not logout when there is an invalid token', async () => {
            const response = await request(app)
                .post('/auth/logout')
                .set('Authorization', `Bearer somerandomtoken41234213`)
                .expect(400);
            
            expect(response.body).toHaveProperty('message', 'Invalid token!');
        });
    });

})