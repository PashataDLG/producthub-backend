const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Product name is required']
        },

        quantity: {
            type: Number,
            required: true,
            default: 0
        },

        price: {
            type: Number,
            default: 0
        }
    },
    {
        timestamps: true
    }
);


const Product = mongoose.model("Products", productSchema);

module.exports = Product;