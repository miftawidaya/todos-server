import { Request, Response, NextFunction } from 'express';
import { validatePrivateApiKey } from '../../middlewares/validatePrivateApiKey';

describe('validatePrivateApiKey Middleware', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction;
  let jsonMock: jest.Mock;
  let statusMock: jest.Mock;

  beforeEach(() => {
    // Setup mock request
    mockRequest = {
      headers: {},
    };

    // Setup mock response
    jsonMock = jest.fn();
    statusMock = jest.fn().mockReturnValue({ json: jsonMock });
    mockResponse = {
      status: statusMock,
      json: jsonMock,
    };

    // Setup next function
    nextFunction = jest.fn();

    // Set environment variable
    process.env.PRIVATE_API_KEY = 'test-secret-key';
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('When API key is valid', () => {
    it('should call next() when header api-key matches server api-key', () => {
      mockRequest.headers = {
        'api-key': 'test-secret-key',
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).toHaveBeenCalledTimes(1);
      expect(statusMock).not.toHaveBeenCalled();
      expect(jsonMock).not.toHaveBeenCalled();
    });
  });

  describe('When API key is invalid', () => {
    it('should return 401 when api-key header is missing', () => {
      mockRequest.headers = {};

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 when api-key header is incorrect', () => {
      mockRequest.headers = {
        'api-key': 'wrong-key',
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 when api-key header is empty string', () => {
      mockRequest.headers = {
        'api-key': '',
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should return 401 when PRIVATE_API_KEY env is not set', () => {
      delete process.env.PRIVATE_API_KEY;
      mockRequest.headers = {
        'api-key': 'test-secret-key',
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });

  describe('Edge cases', () => {
    it('should handle null api-key header', () => {
      mockRequest.headers = {
        'api-key': null as any,
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });

    it('should handle undefined api-key header', () => {
      mockRequest.headers = {
        'api-key': undefined,
      };

      validatePrivateApiKey(
        mockRequest as Request,
        mockResponse as Response,
        nextFunction
      );

      expect(nextFunction).not.toHaveBeenCalled();
      expect(statusMock).toHaveBeenCalledWith(401);
      expect(jsonMock).toHaveBeenCalledWith({ error: 'Unauthorized' });
    });
  });
});
