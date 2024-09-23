import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI; // Get MongoDB connection string from the environment variable
let client;
let clientPromise;

if (!uri) {
  throw new Error('Please add your Mongo URI to the .env.local file'); // Ensure the connection string exists
}


if (process.env.NODE_ENV === 'development') {
  // Global is used to preserve the client across hot-reloading in development.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise; // Reuse client promise in development
} else {
  // In production, directly create and connect the client without caching
  client = new MongoClient(uri, options);
  clientPromise = client.connect().catch((error) => {
    console.error("Failed to connect to MongoDB in production:", error);
    throw new Error("Could not connect to MongoDB. Please check your configuration.");
  });
}

export default clientPromise;
