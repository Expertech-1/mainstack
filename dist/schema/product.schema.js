"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductSchema = exports.searchProductSchema = exports.updateProductSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    name: zod_1.z.string({
        required_error: "Product name is required",
    }).trim().max(50),
    description: zod_1.z.string({
        required_error: "Product description is required",
    }).trim().max(500),
    price: zod_1.z.number({
        required_error: "Product price is required",
    }).min(0, "Price must be a positive number"),
});
exports.updateProductSchema = zod_1.z.object({
    name: zod_1.z.string().optional(),
    description: zod_1.z.string().optional(),
    price: zod_1.z.number().optional()
});
exports.searchProductSchema = zod_1.z.object({
    query: zod_1.z.object({
        name: zod_1.z.string().optional(),
        minPrice: zod_1.z.string().optional(),
        maxPrice: zod_1.z.string().optional(),
    }),
});
exports.deleteProductSchema = zod_1.z.object({
    params: zod_1.z.object({
        productId: zod_1.z.string({
            required_error: "productId is required",
        }).regex(/^[0-9a-fA-F]{24}$/, "Invalid productId format"),
    }),
});
