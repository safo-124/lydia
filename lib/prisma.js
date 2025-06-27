// File: apps/storefront/lib/prisma.js
// This file sets up a singleton PrismaClient instance to be used throughout the application.
// Using a singleton prevents exhausting the database connections by ensuring only one
// instance of PrismaClient is active at any given time, especially in a serverless
// or development environment with hot-reloading.

import { PrismaClient } from '@prisma/client';

// Declare a global variable to cache the PrismaClient instance.
// In JavaScript, `global` provides a space that persists across module reloads.
let prisma;

// Check if the code is running in a production environment.
if (process.env.NODE_ENV === 'production') {
  // In a production environment, it's safe to create a new PrismaClient instance.
  prisma = new PrismaClient();
} else {
  // In a development environment, hot-reloading can create multiple PrismaClient instances,
  // leading to connection pool exhaustion. To prevent this, we check if an instance
  // already exists on the global object.
  if (!global.prisma) {
    // If no instance exists, create a new one and attach it to the global object.
    global.prisma = new PrismaClient();
  }
  // Use the cached instance from the global object.
  prisma = global.prisma;
}

// Export the single, shared instance of PrismaClient.
export default prisma;
