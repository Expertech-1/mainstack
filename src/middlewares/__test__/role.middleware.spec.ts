import { Request, Response, NextFunction } from 'express';
import { Role } from '../../utils/roles.utils'; 
import requiresRole from '../../middlewares/role.middleware'; 

describe('requiresRole Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: jest.Mock;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
    nextFunction = jest.fn();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call next() if user has required role', async () => {
    mockResponse.locals = { user: { roles: [Role.Admin] } };
    const middleware = requiresRole([Role.Admin]);

    await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('should return 403 if user does not have required role', async () => {
    mockResponse.locals = { user: { roles: [Role.User] } };
    const middleware = requiresRole([Role.Admin]);

    await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You do not have the required permissions.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 403 if user is not signed in', async () => {
    mockResponse.locals = {};
    const middleware = requiresRole([Role.Admin]);

    await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You are not signed in.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next() if user has one of multiple required roles', async () => {
    mockResponse.locals = { user: { roles: [Role.Sales] } };
    const middleware = requiresRole([Role.Admin, Role.Sales]);

    await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });

  it('should handle errors and pass them to next()', async () => {
    mockResponse.locals = { user: { roles: [Role.User] } };
    const middleware = requiresRole([Role.Admin]);
    const error = new Error('Test error');

    jest.spyOn(Array.prototype, 'some').mockImplementationOnce(() => {
      throw error;
    });

    await middleware(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(nextFunction).toHaveBeenCalledWith(error);
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});