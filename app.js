const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// routes
app.use('/api/products', productRoute);

const dbURI = 'mongodb+srv://angelp10bet:xwvAAwTEDdwFPRx9@testcluster.5mbtbdt.mongodb.net/Node-Test?retryWrites=true&w=majority&appName=TestCluster';

mongoose.connect(dbURI)
    .then(() => {
        console.log("Connected to database!");
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        });
    })
    .catch(() => {
        console.error("Connection failed");
    });