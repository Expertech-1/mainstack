"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
const dbconfig_1 = __importDefault(require("../../config/dbconfig")); // Update this path
const globals_1 = require("@jest/globals");
const node_test_1 = require("node:test");
globals_1.jest.mock('mongoose', () => ({
    connect: globals_1.jest.fn(),
}));
(0, node_test_1.describe)('connectDB', () => {
    let mongoServer;
    beforeAll(async () => {
        mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    });
    afterAll(async () => {
        await mongoServer.stop();
    });
    (0, node_test_1.afterEach)(() => {
        globals_1.jest.clearAllMocks();
    });
    (0, node_test_1.it)('should connect to the database successfully', async () => {
        const mongoUri = mongoServer.getUri();
        const connectSpy = globals_1.jest.spyOn(mongoose_1.default, 'connect');
        const consoleLogSpy = globals_1.jest.spyOn(console, 'log');
        await (0, dbconfig_1.default)(mongoUri);
        expect(connectSpy).toHaveBeenCalledWith(mongoUri);
        expect(consoleLogSpy).toHaveBeenCalledWith('Connected to the Database!');
    });
    (0, node_test_1.it)('should handle connection errors', async () => {
        const mongoUri = 'invalid_uri';
        const connectSpy = globals_1.jest.spyOn(mongoose_1.default, 'connect').mockRejectedValue(new Error('Connection failed'));
        const consoleLogSpy = globals_1.jest.spyOn(console, 'log');
        await (0, dbconfig_1.default)(mongoUri);
        expect(connectSpy).toHaveBeenCalledWith(mongoUri);
        expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
    });
});
