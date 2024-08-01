const request = require('supertest');
const app = require('../app.js');
const mongoose = require('mongoose');
const User = require('../models/user-model.js');

beforeAll(async () => {
    const dbURI = process.env.MONGODB_URI;
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
            expect(response.body).toHaveProperty('username', 'Testuser98');
    });
})