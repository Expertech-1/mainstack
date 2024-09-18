import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { Product, IProduct } from '../../models/product.model'; 

describe('Product Model Test', () => {
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

  it('create & save product successfully', async () => {
    const validProduct = new Product({
      name: 'Test Product',
      description: 'This is a test product',
      price: 9.99,
      createdBy: new mongoose.Types.ObjectId(),
    });
    const savedProduct = await validProduct.save();
    
    expect(savedProduct._id).toBeDefined();
    expect(savedProduct.name).toBe(validProduct.name);
    expect(savedProduct.description).toBe(validProduct.description);
    expect(savedProduct.price).toBe(validProduct.price);
    expect(savedProduct.createdBy).toEqual(validProduct.createdBy);
    expect(savedProduct.createdAt).toBeDefined();
  });

  it('insert product successfully, but the field does not defined in schema should be undefined', async () => {
    const productWithInvalidField = new Product({
      name: 'Test Product',
      description: 'This is a test product',
      price: 9.99,
      createdBy: new mongoose.Types.ObjectId(),
      invalidField: 'test',
    });
    const savedProductWithInvalidField = await productWithInvalidField.save();
    expect(savedProductWithInvalidField._id).toBeDefined();
    expect(savedProductWithInvalidField.invalidField).toBeUndefined();
  });

  it('create product without required field should failed', async () => {
    const productWithoutRequiredField = new Product({ name: 'Test' });
    let err;
    try {
      await productWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.description).toBeDefined();
    expect(err.errors.price).toBeDefined();
    expect(err.errors.createdBy).toBeDefined();
  });
});