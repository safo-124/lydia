// File: apps/storefront/components/Providers.js
// This component is a client-side wrapper for all context providers.
'use client';

import { SessionProvider } from 'next-auth/react';
import { CartProvider } from '@/context/CartContext';

export default function Providers({ children }) {
  return (
    // The SessionProvider from NextAuth provides session context to the app.
    <SessionProvider>
      {/* The CartProvider provides shopping cart state and functions. */}
      <CartProvider>
        {children}
      </CartProvider>
    </SessionProvider>
  );
}
