const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const authRoute = require('./routes/authentication.route.js');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoute);
app.use('/auth', authRoute);

const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    })
    .catch((error) => {
        console.error("Connection failed", error);
    });