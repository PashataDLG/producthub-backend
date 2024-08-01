const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/product.route.js');
const authRoute = require('./routes/authentication.route.js');
const errorHandler = require('./middlewares/errorHandler.js');
const app = express();

require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/products', productRoute);
app.use('/auth', authRoute);

app.use(errorHandler);

const port = process.env.PORT || 3000;
const dbURI = process.env.NODE_ENV === 'test' ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("Connected to database!");

        // Стартирай сървъра само ако не сме в тестова среда
        if (process.env.NODE_ENV !== 'test') {
            app.listen(port, () => {
                console.log(`Server is running on port ${port}`);
            });
        }
    })
    .catch((error) => {
        console.error("Connection failed", error);
    });

module.exports = app;
