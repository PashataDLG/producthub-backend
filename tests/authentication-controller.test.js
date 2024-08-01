const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const User = require('../models/user-model.js');

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