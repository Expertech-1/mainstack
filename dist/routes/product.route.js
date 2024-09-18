"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const product_controller_1 = __importDefault(require("../controllers/product.controller"));
const router = (0, express_1.Router)();
router.post('/createProduct', product_controller_1.default.createProduct);
router.get('/getAllproducts', product_controller_1.default.getAllProducts);
router.get('/getProduct/:productId', product_controller_1.default.getProduct);
router.get('/searchProducts', product_controller_1.default.searchProducts);
router.delete('/deleteProduct/:productId', product_controller_1.default.deleteProduct);
router.put('/updateProduct/:productId', product_controller_1.default.updateProduct);
exports.default = router;
