const Product = require('../models/product.model');

const getAllProducts = async () => {
    const allProducts = await Product.find({});

    return allProducts;
};

const getProductById = async (id) => {
    const product = await Product.findById(id);

    if(!product) {
        throw new Error('Product not found');
    };

    return product;
};

const createProduct = async (productInfo) => {
    const createdProduct = await Product.create(productInfo);

    return createdProduct;
};

const updateProduct = async (id, updatedInfo) => {
    const updatedProduct = await Product.findByIdAndUpdate(id, updatedInfo);

    if(!updatedProduct) {
        throw new Error('Product not found');
    };

    return updatedProduct;
};

const deleteProduct = async (id) => {
    const deletedProduct = await Product.findByIdAndDelete(id);

    if(!deletedProduct) {
        throw new Error('Product not found');
    }

    return deletedProduct;
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};