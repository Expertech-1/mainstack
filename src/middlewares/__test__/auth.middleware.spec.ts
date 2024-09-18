import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../../utils/jwt.utils';
import { User } from '../../models/user.model';
import authorizeUser from '../../middlewares/auth.middleware'; // Update this path

jest.mock('../../utils/jwt.utils');
jest.mock('../../models/user.model');

describe('authorizeUser middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      headers: {},
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      locals: {},
    };
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return 401 if no token is provided', async () => {
    await authorizeUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'You are not signed in. Please log in first.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should call next() if token is valid and user is found', async () => {
    const mockUser = { _id: 'user123', name: 'Test User' };
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    (verifyJwt as jest.Mock).mockReturnValue({ valid: true, expired: false, decoded: { id: 'user123' } });
    (User.findById as jest.Mock).mockResolvedValue(mockUser);

    await authorizeUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(verifyJwt).toHaveBeenCalledWith('validtoken');
    expect(User.findById).toHaveBeenCalledWith('user123');
    expect(mockResponse.locals?.user).toEqual(mockUser);
    expect(nextFunction).toHaveBeenCalled();
  });

  it('should return 401 if user is not found', async () => {
    mockRequest.headers = { authorization: 'Bearer validtoken' };
    (verifyJwt as jest.Mock).mockReturnValue({ valid: true, expired: false, decoded: { id: 'user123' } });
    (User.findById as jest.Mock).mockResolvedValue(null);

    await authorizeUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(401);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'User not found. Please log in again.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 403 if token is expired', async () => {
    mockRequest.headers = { authorization: 'Bearer expiredtoken' };
    (verifyJwt as jest.Mock).mockReturnValue({ valid: false, expired: true, decoded: null });

    await authorizeUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid or expired token. Please log in again.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it('should return 403 if token is invalid', async () => {
    mockRequest.headers = { authorization: 'Bearer invalidtoken' };
    (verifyJwt as jest.Mock).mockReturnValue({ valid: false, expired: false, decoded: null });

    await authorizeUser(mockRequest as Request, mockResponse as Response, nextFunction);

    expect(mockResponse.status).toHaveBeenCalledWith(403);
    expect(mockResponse.json).toHaveBeenCalledWith({ message: 'Invalid token.' });
    expect(nextFunction).not.toHaveBeenCalled();
  });
});