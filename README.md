# ProductHub

## Description

ProductHub is a personal project developed with Node.js and Express.js. It serves as a simple exercise to practice CRUD operations and authentication, offering user registration, login, and logout functionalities, along with complete product management capabilities. This project aims to improve skills in developing web applications.

- **Joi**: Schema validation
- **Jest**: Testing
- **Express.js**: Web server framework
- **Express Router**: Routing
- **JWT (JSON Web Tokens)**: Authentication
- **Bcrypt**: Password hashing
- **Mongoose**: Database interaction with MongoDB

For database management, ProductHub utilizes **MongoDB**, ensuring scalability and flexibility in data storage and retrieval.

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Tests](#tests)
- [Environment Variables](#environment-variables)
- [Notes](#notes)

## Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/PashataDLG/ProductHub
    ```

2. Navigate to the project directory:

    ```bash
    cd ProductHub
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Set up the environment variables in a `.env` file:

    ```env
    PORT=3000
    JWT_SECRET=b3st_k3pt_s3cr37!
    MONGODB_URI=mongodb+srv://angelp10bet:xwvAAwTEDdwFPRx9@testcluster.5mbtbdt.mongodb.net/Node-Test?retryWrites=true&w=majority&appName=TestCluster
    TEST_MONGODB_URI=mongodb+srv://angelp10bet:xwvAAwTEDdwFPRx9@testcluster.5mbtbdt.mongodb.net/test-db?retryWrites=true&w=majority&appName=TestCluster
    ```

## Usage

1. Start the server:

    ```bash
    npm run dev
    ```

2. The application will run on `http://localhost:3000`.

## API Endpoints

### Authentication

- **Register**: `POST /auth/register`
    - Request Body:
    ```json
    {
        "username": "TestUsername1",
        "password": "TestPassword1!"
    }
    ```
    - Response:
        - Status: `201 Created`
        - Body:
        ```json
        {
            "message": "User registered successfully"
        }
        ```

- **Login**: `POST /auth/login`
    - Request Body:
    ```json
    {
        "username": "TestUsername1",
        "password": "TestPassword1!"
    }
    ```
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        {
            "token": "jwt_token_here"
        }
        ```

- **Logout**: `POST /auth/logout`
    - Request Header: `Authorization: Bearer <token>`
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        {
            "message": "Successfully logged out."
        }
        ```

### Products

- **Get All Products**: `GET /api/products`
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        [
            {
                "id": "1",
                "name": "Product A",
                "price": 10.99,
                "quantity": 100
            },
            {
                "id": "2",
                "name": "Product B",
                "price": 5.49,
                "quantity": 200
            }
        ]
        ```

- **Get Product by ID**: `GET /api/products/:id`
    - Parameters: `id` (string) - The ID of the product to retrieve
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        {
            "id": "1",
            "name": "Product A",
            "price": 10.99,
            "quantity": 100
        }
        ```

- **Create Product**: `POST /api/products`
    - Request Body:
    ```json
    {
        "name": "Product A",
        "price": 10.99,
        "quantity": 100
    }
    ```
    - Response:
        - Status: `201 Created`
        - Body:
        ```json
        {
            "id": "1",
            "name": "Product A",
            "price": 10.99,
            "quantity": 100
        }
        ```

- **Update Product**: `PUT /api/products/:id`
    - Parameters: `id` (string) - The ID of the product to update
    - Request Body:
        - You can include any of the following fields to update specific properties of the product:
        ```json
        {
            "name": "Updated Product A",
            "price": 12.99,
            "quantity": 150
        }
        ```
        - Example: To update only the `price`:
        ```json
        {
            "price": 12.99
        }
        ```
        - Example: To update only the `quantity`:
        ```json
        {
            "quantity": 150
        }
        ```
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        {
            "id": "1",
            "name": "Updated Product A",
            "price": 12.99,
            "quantity": 150
        }
        ```

- **Delete Product**: `DELETE /api/products/:id`
    - Parameters: `id` (string) - The ID of the product to delete
    - Response:
        - Status: `200 OK`
        - Body:
        ```json
        {
            "message": "Product deleted successfully"
        }
        ```

## Tests

To run tests:

1. Ensure you have set up the `TEST_MONGODB_URI` in your `.env` file.
2. Run the tests using Jest:

    ```bash
    npm test
    ```

## Environment Variables

The following environment variables need to be set:

```env
PORT=3000
JWT_SECRET=your_jwt_secret
MONGODB_URI=your_mongodb_uri
TEST_MONGODB_URI=your_test_mongodb_uri
 ```

## Notes

- For updating a product, you do not need to provide all product details. You can choose to update only specific fields such as `quantity` or `price`.
- The `Authorization` header is required for endpoints that require authentication. Format: `Authorization: Bearer <token>`.
- **Username Requirements**:
    - Must be at least 4 characters long.
    - Must be alphanumeric.
    - Must contain at least one number.

- **Password Requirements**:
    - Must contain at least one lowercase letter.
    - Must contain at least one uppercase letter.
    - Must contain at least one number.
    - Must contain at least one special symbol.
