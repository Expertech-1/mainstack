import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import ProductService from '../../services/product.service'; // Update this path
import { Product, IProduct, ProductDocument } from '../../models/product.model';

describe('ProductService', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  afterEach(async () => {
    await Product.deleteMany({});
  });

  describe('createProduct', () => {
    it('should create a product successfully', async () => {
      const productDetails = { name: 'Test Product', price: 10, description: 'Test Description' };
      const userId = new mongoose.Types.ObjectId().toString();

      const result = await ProductService.createProduct(productDetails, userId);

      expect(result).toBeDefined();
      expect(result.name).toBe(productDetails.name);
      expect(result.price).toBe(productDetails.price);
      expect(result.createdBy.toString()).toBe(userId);
    });
  });

  describe('getAllProducts', () => {
    it('should return all products', async () => {
      const products = [
        { name: 'Product 1', price: 10, description: 'Description 1' },
        { name: 'Product 2', price: 20, description: 'Description 2' },
      ];

      await Product.create(products);

      const result = await ProductService.getAllProducts();

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe(products[0].name);
      expect(result[1].name).toBe(products[1].name);
    });
  });

  describe('getProduct', () => {
    it('should return a specific product', async () => {
      const product = await Product.create({ name: 'Test Product', price: 10, description: 'Test Description' });

      const result = await ProductService.getProduct(product._id.toString());

      expect(result).toBeDefined();
      expect(result.name).toBe(product.name);
    });

    it('should throw an error if product is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      await expect(ProductService.getProduct(nonExistentId)).rejects.toThrow('Product not found');
    });
  });

  describe('updateProduct', () => {
    it('should update a product successfully', async () => {
      const product = await Product.create({ name: 'Test Product', price: 10, description: 'Test Description' });
      const updateData = { name: 'Updated Product', price: 20 };
      const product: ProductDocument = await ProductModel.findById(productId);

      const result = await ProductService.updateProduct(product._id.toString(), updateData);

      expect(result).toBeDefined();
      expect(result!.name).toBe(updateData.name);
      expect(result!.price).toBe(updateData.price);
    });

    it('should throw an error if product to update is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();
      const updateData = { name: 'Updated Product' };

      await expect(ProductService.updateProduct(nonExistentId, updateData)).rejects.toThrow('Product not found');
    });
  });

  describe('searchProducts', () => {
    beforeEach(async () => {
      const products = [
        { name: 'Product A', price: 10, description: 'Description A' },
        { name: 'Product B', price: 20, description: 'Description B' },
        { name: 'Product C', price: 30, description: 'Description C' },
      ];
      await Product.create(products);
    });

    it('should search products by name', async () => {
      const result = await ProductService.searchProducts({ name: 'Product A' });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Product A');
    });

    it('should search products by price range', async () => {
      const result = await ProductService.searchProducts({ minPrice: 15, maxPrice: 25 });

      expect(result).toHaveLength(1);
      expect(result[0].name).toBe('Product B');
    });

    it('should search products by name and price range', async () => {
      const result = await ProductService.searchProducts({ name: 'Product', minPrice: 20 });

      expect(result).toHaveLength(2);
      expect(result[0].name).toBe('Product B');
      expect(result[1].name).toBe('Product C');
    });
  });

  describe('deleteProduct', () => {
    it('should delete a product successfully', async () => {
      const product = await Product.create({ name: 'Test Product', price: 10, description: 'Test Description' });

      const result = await ProductService.deleteProduct(product._id.toString());

      expect(result).toEqual({ message: "Product deleted successfully" });

      const deletedProduct = await Product.findById(product._id);
      expect(deletedProduct).toBeNull();
    });

    it('should throw an error if product to delete is not found', async () => {
      const nonExistentId = new mongoose.Types.ObjectId().toString();

      await expect(ProductService.deleteProduct(nonExistentId)).rejects.toThrow('Product not found');
    });
  });
});