"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_controller_1 = __importDefault(require("../../controllers/product.controller"));
const product_service_1 = __importDefault(require("../../services/product.service"));
const product_schema_1 = require("../../schema/product.schema");
jest.mock('../../services/product.service');
describe('ProductController', () => {
    let mockRequest;
    let mockResponse;
    let responseObject;
    beforeEach(() => {
        mockRequest = {};
        responseObject = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn().mockImplementation(result => {
                responseObject = result;
                return mockResponse;
            }),
            locals: {
                user: { id: 'testUserId' }
            }
        };
    });
    describe('createProduct', () => {
        it('should create a product successfully', async () => {
            const productData = { id: "id", name: 'Test Product', price: 10, description: 'Test Description', createdBy: "h", createdAt: "h", };
            mockRequest.body = productData;
            jest.spyOn(product_schema_1.createProductSchema, 'parse').mockReturnValue(productData);
            jest.spyOn(product_service_1.default, 'createProduct').mockResolvedValue({ _id: 'newProductId', ...productData });
            await product_controller_1.default.createProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(responseObject).toEqual({
                message: "Product created successfully",
                product: expect.objectContaining(productData)
            });
        });
        it('should handle errors', async () => {
            mockRequest.body = {};
            jest.spyOn(product_schema_1.createProductSchema, 'parse').mockImplementation(() => {
                throw new Error('Validation error');
            });
            await product_controller_1.default.createProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(responseObject).toEqual({ message: 'Validation error' });
        });
    });
    describe('getProduct', () => {
        it('should get a product successfully', async () => {
            const productId = 'testProductId';
            mockRequest.params = { productId };
            const mockProduct = { id: productId, name: 'Test Product' };
            jest.spyOn(product_service_1.default, 'getProduct').mockResolvedValue(mockProduct);
            await product_controller_1.default.getProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(201);
            expect(responseObject).toEqual(mockProduct);
        });
        it('should handle errors', async () => {
            mockRequest.params = { productId: 'invalidId' };
            jest.spyOn(product_service_1.default, 'getProduct').mockRejectedValue(new Error('Product not found'));
            await product_controller_1.default.getProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(responseObject).toEqual({ message: 'Product not found' });
        });
    });
    describe('getAllProducts', () => {
        it('should get all products successfully', async () => {
            const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
            jest.spyOn(product_service_1.default, 'getAllProducts').mockResolvedValue(mockProducts);
            await product_controller_1.default.getAllProducts(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toEqual(mockProducts);
        });
        it('should handle errors', async () => {
            jest.spyOn(product_service_1.default, 'getAllProducts').mockRejectedValue(new Error('Database error'));
            await product_controller_1.default.getAllProducts(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(400);
            expect(responseObject).toEqual({ message: 'Database error' });
        });
    });
    describe('updateProduct', () => {
        it('should update a product successfully', async () => {
            const productId = 'testProductId';
            const updateData = { name: 'Updated Product' };
            mockRequest.params = { productId };
            mockRequest.body = updateData;
            jest.spyOn(product_schema_1.updateProductSchema, 'parse').mockReturnValue(updateData);
            jest.spyOn(product_service_1.default, 'updateProduct').mockResolvedValue({ id: productId, ...updateData });
            await product_controller_1.default.updateProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toEqual(expect.objectContaining(updateData));
        });
        it('should handle product not found', async () => {
            mockRequest.params = { productId: 'invalidId' };
            mockRequest.body = { name: 'Updated Product' };
            jest.spyOn(product_schema_1.updateProductSchema, 'parse').mockReturnValue(mockRequest.body);
            jest.spyOn(product_service_1.default, 'updateProduct').mockResolvedValue(null);
            await product_controller_1.default.updateProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(responseObject).toEqual({ message: 'Product not found' });
        });
    });
    describe('searchProducts', () => {
        it('should search products successfully', async () => {
            const searchQuery = { name: 'Test', minPrice: 10, maxPrice: 100 };
            mockRequest.query = searchQuery;
            jest.spyOn(product_schema_1.searchProductSchema, 'parse').mockReturnValue({ query: searchQuery });
            const mockProducts = [{ id: '1', name: 'Test Product', price: 50 }];
            jest.spyOn(product_service_1.default, 'searchProducts').mockResolvedValue(mockProducts);
            await product_controller_1.default.searchProducts(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toEqual(mockProducts);
        });
        it('should handle errors', async () => {
            mockRequest.query = {};
            jest.spyOn(product_schema_1.searchProductSchema, 'parse').mockImplementation(() => {
                throw new Error('Invalid search parameters');
            });
            await product_controller_1.default.searchProducts(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(500);
            expect(responseObject).toEqual({ message: 'Invalid search parameters' });
        });
    });
    describe('deleteProduct', () => {
        it('should delete a product successfully', async () => {
            const productId = 'testProductId';
            mockRequest.params = { productId };
            jest.spyOn(product_schema_1.deleteProductSchema, 'parse').mockReturnValue({ params: { productId } });
            const mockDeletedProduct = { id: productId, name: 'Deleted Product' };
            jest.spyOn(product_service_1.default, 'deleteProduct').mockResolvedValue(mockDeletedProduct);
            await product_controller_1.default.deleteProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(200);
            expect(responseObject).toEqual(mockDeletedProduct);
        });
        it('should handle errors', async () => {
            mockRequest.params = { productId: 'invalidId' };
            jest.spyOn(product_schema_1.deleteProductSchema, 'parse').mockReturnValue({ params: { productId: 'invalidId' } });
            jest.spyOn(product_service_1.default, 'deleteProduct').mockRejectedValue(new Error('Product not found'));
            await product_controller_1.default.deleteProduct(mockRequest, mockResponse);
            expect(mockResponse.status).toHaveBeenCalledWith(404);
            expect(responseObject).toEqual({ message: 'Product not found' });
        });
    });
});
