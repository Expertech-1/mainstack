"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_codes_1 = require("http-status-codes");
const notFound_middleware_1 = __importDefault(require("../../middlewares/notFound.middleware")); // Update this path
describe('404 Error Page Middleware', () => {
    let mockRequest;
    let mockResponse;
    let nextFunction;
    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            status: jest.fn().mockReturnThis(),
            send: jest.fn(),
        };
        nextFunction = jest.fn();
    });
    it('should set status to 404 and send error message', () => {
        (0, notFound_middleware_1.default)(mockRequest, mockResponse, nextFunction);
        expect(mockResponse.status).toHaveBeenCalledWith(http_status_codes_1.StatusCodes.NOT_FOUND);
        expect(mockResponse.send).toHaveBeenCalledWith('Error Page: Resource cannot be found!');
        expect(nextFunction).not.toHaveBeenCalled();
    });
});
