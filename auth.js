// File: apps/storefront/auth.js
// This file configures Auth.js with providers and the Prisma adapter.

import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    // You can add more providers here (e.g., Apple, Facebook)
  ],
  session: {
    strategy: 'jwt', // Using JSON Web Tokens for session management
  },
  callbacks: {
    // Add the user ID and other fields to the session token
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub; // token.sub is the user's ID
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login', // We will create this page next
  },
});