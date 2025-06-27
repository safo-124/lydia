// File: apps/storefront/app/api/my-orders/route.js
// This secure API endpoint fetches order history for the currently authenticated user.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth'; // Import the server-side auth utility

/**
 * Handles GET requests to fetch the order history for the logged-in user.
 * @param {Request} request
 * @returns {NextResponse}
 */
export async function GET(request) {
  // Get the session to identify the current user.
  const session = await auth();

  // If there's no session, the user is not authenticated.
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const orders = await prisma.order.findMany({
      where: {
        // This is the crucial security filter:
        // only return orders where the userId matches the session user's ID.
        userId: session.user.id,
      },
      orderBy: {
        createdAt: 'desc', // Show the most recent orders first
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch user orders:', error);
    return NextResponse.json(
      { message: 'Something went wrong while fetching your orders.' },
      { status: 500 }
    );
  }
}
