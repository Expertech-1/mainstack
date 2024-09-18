"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_service_1 = __importDefault(require("../services/product.service"));
const product_schema_1 = require("../schema/product.schema");
class ProductController {
    static async createProduct(req, res) {
        try {
            const userId = res.locals.user.id;
            const validatedData = product_schema_1.createProductSchema.parse(req.body);
            const product = await product_service_1.default.createProduct(validatedData, userId);
            res.status(201).json({ message: "Product created successfully", product });
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async getProduct(req, res) {
        try {
            const productId = req.params.productId;
            console.log(productId);
            const product = await product_service_1.default.getProduct(productId);
            res.status(201).json(product);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async getAllProducts(req, res) {
        try {
            const products = await product_service_1.default.getAllProducts();
            res.status(200).json(products);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async updateProduct(req, res) {
        try {
            const { productId } = req.params;
            const validatedData = product_schema_1.updateProductSchema.parse(req.body);
            const updatedProduct = await product_service_1.default.updateProduct(productId, validatedData);
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(updatedProduct);
        }
        catch (err) {
            res.status(400).json({ message: err.message });
        }
    }
    static async searchProducts(req, res) {
        try {
            const validatedData = product_schema_1.searchProductSchema.parse({
                query: req.query,
            });
            const { name, minPrice, maxPrice } = validatedData.query;
            const products = await product_service_1.default.searchProducts({ name, minPrice, maxPrice });
            res.status(200).json(products);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    static async deleteProduct(req, res) {
        try {
            const { productId } = product_schema_1.deleteProductSchema.parse({
                params: req.params,
            }).params;
            const deletedProduct = await product_service_1.default.deleteProduct(productId);
            console.log(deletedProduct);
            return res.status(200).json(deletedProduct);
        }
        catch (error) {
            return res.status(404).json({ message: error.message });
        }
    }
}
exports.default = ProductController;
