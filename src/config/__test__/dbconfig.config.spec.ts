import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import connectDB from '../../config/dbconfig'; // Update this path
import { jest } from '@jest/globals';
import { beforeEach, afterEach, describe, it } from 'node:test';

jest.mock('mongoose', () => ({
  connect: jest.fn(),
}));

describe('connectDB', () => {
  let mongoServer: MongoMemoryServer;

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
  });

  afterAll(async () => {
    await mongoServer.stop();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should connect to the database successfully', async () => {
    const mongoUri = mongoServer.getUri();
    const connectSpy = jest.spyOn(mongoose, 'connect');
    const consoleLogSpy = jest.spyOn(console, 'log');

    await connectDB(mongoUri);

    expect(connectSpy).toHaveBeenCalledWith(mongoUri);
    expect(consoleLogSpy).toHaveBeenCalledWith('Connected to the Database!');
  });

  it('should handle connection errors', async () => {
    const mongoUri = 'invalid_uri';
    const connectSpy = jest.spyOn(mongoose, 'connect').mockRejectedValue(new Error('Connection failed'));
    const consoleLogSpy = jest.spyOn(console, 'log');

    await connectDB(mongoUri);

    expect(connectSpy).toHaveBeenCalledWith(mongoUri);
    expect(consoleLogSpy).toHaveBeenCalledWith(expect.any(Error));
  });
});