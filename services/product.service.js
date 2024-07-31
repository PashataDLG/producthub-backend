const Product = require('../models/product.model');

const getAllProducts = async () => {
    try {
        const allProducts = await Product.find({});

        return allProducts;
    } catch (error) {
        console.error('Error getting all products: ', error);

        throw new Error('Failed to get all products');
    }
};

const getProductById = async (id) => {
    try {
        const product = await Product.findById(id);

        return product;
    } catch (error) {
        console.error('Error getting a specific product: ', error);

        throw new Error('Failed to get a product');
    }
};

const createProduct = async (productInfo) => {
    try {
        const createdProduct = await Product.create(productInfo);

        return createdProduct;
    } catch (error) {
        console.error('Error creating a new product: ', error);

        throw new Error('Failed to create a product');
    }
};

const updateProduct = async (id, updatedInfo) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, updatedInfo);

        return updatedProduct;
    } catch (error) {
        console.error('Error updating a product: ', error);

        throw new Error('Failed to update the product');
    }
};

const deleteProduct = async (id) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(id);

        return deletedProduct;
    } catch (error) {
        console.error('Error deleting a product: ', error);

        throw new Error('Failed to delete the product');
    }
};

module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};