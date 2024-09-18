import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import { User, IUser, UType, UStatus } from '../../models/user.model'; // Update this path

describe('User Model Test', () => {
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

  it('create & save user successfully', async () => {
    const validUser = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      password: 'password123',
      userType: UType.User,
      status: UStatus.Active,
    });
    const savedUser = await validUser.save();
    
    expect(savedUser._id).toBeDefined();
    expect(savedUser.firstName).toBe(validUser.firstName);
    expect(savedUser.lastName).toBe(validUser.lastName);
    expect(savedUser.email).toBe(validUser.email);
    expect(savedUser.password).toBe(validUser.password);
    expect(savedUser.userType).toBe(UType.User);
    expect(savedUser.status).toBe(UStatus.Active);
    expect(savedUser.mobileNumber).toBe("");
  });

  it('insert user with fields not defined in schema', async () => {
    const userWithInvalidField = new User({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      invalidField: 'test',
    });
    const savedUserWithInvalidField = await userWithInvalidField.save();
    expect(savedUserWithInvalidField._id).toBeDefined();
    expect(savedUserWithInvalidField.invalidField).toBeUndefined();
  });

  it('create user without required field should fail', async () => {
    const userWithoutRequiredField = new User({ firstName: 'John' });
    let err;
    try {
      await userWithoutRequiredField.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.lastName).toBeDefined();
    expect(err.errors.email).toBeDefined();
    expect(err.errors.password).toBeDefined();
  });

  it('create user with invalid enum value should fail', async () => {
    const userWithInvalidEnum = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.invalid@example.com',
      password: 'password123',
      userType: 'invalidType',
      status: 'invalidStatus',
    });
    let err;
    try {
      await userWithInvalidEnum.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(err.errors.userType).toBeDefined();
    expect(err.errors.status).toBeDefined();
  });

  it('create duplicate user should fail', async () => {
    const user1 = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.duplicate@example.com',
      password: 'password123',
    });
    await user1.save();

    const user2 = new User({
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.duplicate@example.com',
      password: 'password456',
    });

    let err;
    try {
      await user2.save();
    } catch (error) {
      err = error;
    }
    expect(err).toBeDefined();
    expect(err.code).toBe(11000); 
  });
});