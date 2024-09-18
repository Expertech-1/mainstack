import { Request, Response } from 'express';
import ProductController from '../../controllers/product.controller'; 
import ProductService from '../../services/product.service';
import { 
  createProductSchema, 
  updateProductSchema, 
  searchProductSchema, 
  deleteProductSchema 
} from '../../schema/product.schema';

jest.mock('../../services/product.service');

describe('ProductController', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let responseObject: any;

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
      const productData = { id: "id", name: 'Test Product', price: 10, description: 'Test Description', createdBy: "h", createdAt: "h",};
      mockRequest.body = productData;

      jest.spyOn(createProductSchema, 'parse').mockReturnValue(productData);
      jest.spyOn(ProductService, 'createProduct').mockResolvedValue({ _id: 'newProductId', ...productData });

      await ProductController.createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual({
        message: "Product created successfully",
        product: expect.objectContaining(productData)
      });
    });

    it('should handle errors', async () => {
      mockRequest.body = {};
      jest.spyOn(createProductSchema, 'parse').mockImplementation(() => {
        throw new Error('Validation error');
      });

      await ProductController.createProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ message: 'Validation error' });
    });
  });

  describe('getProduct', () => {
    it('should get a product successfully', async () => {
      const productId = 'testProductId';
      mockRequest.params = { productId };

      const mockProduct = { id: productId, name: 'Test Product' };
      jest.spyOn(ProductService, 'getProduct').mockResolvedValue(mockProduct);

      await ProductController.getProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(201);
      expect(responseObject).toEqual(mockProduct);
    });

    it('should handle errors', async () => {
      mockRequest.params = { productId: 'invalidId' };
      jest.spyOn(ProductService, 'getProduct').mockRejectedValue(new Error('Product not found'));

      await ProductController.getProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(responseObject).toEqual({ message: 'Product not found' });
    });
  });

  describe('getAllProducts', () => {
    it('should get all products successfully', async () => {
      const mockProducts = [{ id: '1', name: 'Product 1' }, { id: '2', name: 'Product 2' }];
      jest.spyOn(ProductService, 'getAllProducts').mockResolvedValue(mockProducts);

      await ProductController.getAllProducts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockProducts);
    });

    it('should handle errors', async () => {
      jest.spyOn(ProductService, 'getAllProducts').mockRejectedValue(new Error('Database error'));

      await ProductController.getAllProducts(mockRequest as Request, mockResponse as Response);

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

      jest.spyOn(updateProductSchema, 'parse').mockReturnValue(updateData);
      jest.spyOn(ProductService, 'updateProduct').mockResolvedValue({ id: productId, ...updateData });

      await ProductController.updateProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(expect.objectContaining(updateData));
    });

    it('should handle product not found', async () => {
      mockRequest.params = { productId: 'invalidId' };
      mockRequest.body = { name: 'Updated Product' };

      jest.spyOn(updateProductSchema, 'parse').mockReturnValue(mockRequest.body);
      jest.spyOn(ProductService, 'updateProduct').mockResolvedValue(null);

      await ProductController.updateProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ message: 'Product not found' });
    });
  });

  describe('searchProducts', () => {
    it('should search products successfully', async () => {
      const searchQuery = { name: 'Test', minPrice: 10, maxPrice: 100 };
      mockRequest.query = searchQuery;

      jest.spyOn(searchProductSchema, 'parse').mockReturnValue({ query: searchQuery });
      const mockProducts = [{ id: '1', name: 'Test Product', price: 50 }];
      jest.spyOn(ProductService, 'searchProducts').mockResolvedValue(mockProducts);

      await ProductController.searchProducts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockProducts);
    });

    it('should handle errors', async () => {
      mockRequest.query = {};
      jest.spyOn(searchProductSchema, 'parse').mockImplementation(() => {
        throw new Error('Invalid search parameters');
      });

      await ProductController.searchProducts(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(responseObject).toEqual({ message: 'Invalid search parameters' });
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const productId = 'testProductId';
      mockRequest.params = { productId };

      jest.spyOn(deleteProductSchema, 'parse').mockReturnValue({ params: { productId } });
      const mockDeletedProduct = { id: productId, name: 'Deleted Product' };
      jest.spyOn(ProductService, 'deleteProduct').mockResolvedValue(mockDeletedProduct);

      await ProductController.deleteProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(responseObject).toEqual(mockDeletedProduct);
    });

    it('should handle errors', async () => {
      mockRequest.params = { productId: 'invalidId' };
      jest.spyOn(deleteProductSchema, 'parse').mockReturnValue({ params: { productId: 'invalidId' } });
      jest.spyOn(ProductService, 'deleteProduct').mockRejectedValue(new Error('Product not found'));

      await ProductController.deleteProduct(mockRequest as Request, mockResponse as Response);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(responseObject).toEqual({ message: 'Product not found' });
    });
  });
});