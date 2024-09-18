"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = require("../models/product.model");
const mongoose_1 = require("mongoose");
class ProductService {
    static async createProduct(productDetails, userId) {
        const product = new product_model_1.Product({
            ...productDetails,
            createdBy: new mongoose_1.Types.ObjectId(userId),
        });
        const savedProduct = await product.save();
        return savedProduct;
    }
    static async getAllProducts() {
        const products = await product_model_1.Product.find().populate('createdBy', 'email');
        return products;
    }
    static async getProduct(productId) {
        const product = await product_model_1.Product.findById(productId).populate('createdBy');
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    static async updateProduct(productId, updateData) {
        const product = await product_model_1.Product.findByIdAndUpdate(productId, updateData, { new: true });
        if (!product) {
            throw new Error('Product not found');
        }
        return product;
    }
    static async searchProducts(query) {
        const searchQuery = {};
        if (query.name) {
            searchQuery.name = { $regex: query.name, $options: 'i' };
        }
        if (query.minPrice && query.maxPrice) {
            searchQuery.price = { $gte: query.minPrice, $lte: query.maxPrice };
        }
        else if (query.minPrice) {
            searchQuery.price = { $gte: query.minPrice };
        }
        else if (query.maxPrice) {
            searchQuery.price = { $lte: query.maxPrice };
        }
        const products = await product_model_1.Product.find(searchQuery).populate('createdBy', 'email');
        return products;
    }
    static async deleteProduct(productId) {
        const product = await product_model_1.Product.findByIdAndDelete(productId);
        if (!product) {
            throw new Error('Product not found');
        }
        return { message: "Product deleted successfully" };
    }
}
exports.default = ProductService;
