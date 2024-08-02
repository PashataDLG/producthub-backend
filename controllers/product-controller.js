const productService = require('../services/product-service.js');

const getProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.getProductById(id);

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(200).json(newProduct);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await productService.updateProduct(id, req.body);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const updatedProduct = await productService.getProductById(id);

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
};

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        const product = await productService.deleteProduct(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json({ message: "Product deleted successfully" });
    } catch (error) {
        s
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
}