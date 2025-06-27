// File: apps/storefront/app/api/auth/[...nextauth]/route.js
// This creates a catch-all API route for all authentication operations.

import { handlers } from '@/auth';
export const { GET, POST } = handlers;
