import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import __404_err_page from '../../middlewares/notFound.middleware'; 

describe('404 Error Page Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    nextFunction = jest.fn();
  });

  it('should set status to 404 and send error message', () => {
    __404_err_page(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(mockResponse.send).toHaveBeenCalledWith('Error Page: Resource cannot be found!');
    expect(nextFunction).not.toHaveBeenCalled();
  });
});