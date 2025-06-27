// File: apps/storefront/app/api/users/[id]/route.js
// This API endpoint fetches a single user's details and their complete order history.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Handles GET requests to fetch a single user by their ID.
 * @param {Request} request The incoming request object.
 * @param {object} context Contains route parameters. `context.params.id` is the user's ID.
 * @returns {NextResponse} A response object with the user data or an error.
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: 'User ID is required.' }, { status: 400 });
    }
    
    // In a real app, this should be secured so only dashboard admins can access it.

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
      // Include all related orders for this user
      include: {
        orders: {
          orderBy: {
            createdAt: 'desc', // Show their most recent orders first
          },
        },
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User not found.' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error(`Failed to fetch user ${params.id}:`, error);
    return NextResponse.json(
      { message: 'Something went wrong while fetching user details.' },
      { status: 500 }
    );
  }
}
