"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const product_model_1 = require("../../models/product.model"); // Update this path
describe('Product Model Test', () => {
    let mongoServer;
    beforeAll(async () => {
        mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
        const mongoUri = mongoServer.getUri();
        await mongoose_1.default.connect(mongoUri);
    });
    afterAll(async () => {
        await mongoose_1.default.disconnect();
        await mongoServer.stop();
    });
    it('create & save product successfully', async () => {
        const validProduct = new product_model_1.Product({
            name: 'Test Product',
            description: 'This is a test product',
            price: 9.99,
            createdBy: new mongoose_1.default.Types.ObjectId(),
        });
        const savedProduct = await validProduct.save();
        // Object Id should be defined when successfully saved to MongoDB.
        expect(savedProduct._id).toBeDefined();
        expect(savedProduct.name).toBe(validProduct.name);
        expect(savedProduct.description).toBe(validProduct.description);
        expect(savedProduct.price).toBe(validProduct.price);
        expect(savedProduct.createdBy).toEqual(validProduct.createdBy);
        expect(savedProduct.createdAt).toBeDefined();
    });
    // You might also test validations to ensure incorrect data isn't accepted
    it('insert product successfully, but the field does not defined in schema should be undefined', async () => {
        const productWithInvalidField = new product_model_1.Product({
            name: 'Test Product',
            description: 'This is a test product',
            price: 9.99,
            createdBy: new mongoose_1.default.Types.ObjectId(),
            invalidField: 'test',
        });
        const savedProductWithInvalidField = await productWithInvalidField.save();
        expect(savedProductWithInvalidField._id).toBeDefined();
        expect(savedProductWithInvalidField.invalidField).toBeUndefined();
    });
    it('create product without required field should failed', async () => {
        const productWithoutRequiredField = new product_model_1.Product({ name: 'Test' });
        let err;
        try {
            await productWithoutRequiredField.save();
        }
        catch (error) {
            err = error;
        }
        expect(err).toBeInstanceOf(mongoose_1.default.Error.ValidationError);
        expect(err.errors.description).toBeDefined();
        expect(err.errors.price).toBeDefined();
        expect(err.errors.createdBy).toBeDefined();
    });
});
