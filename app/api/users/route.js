// File: apps/storefront/app/api/users/route.js
// This API endpoint, located in the storefront app, provides a list of all registered users.
// The dashboard will fetch data from this endpoint.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Uses the storefront's prisma client instance

/**
 * Handles GET requests to fetch all user data.
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A JSON response containing the list of users or an error message.
 */
export async function GET(request) {
  try {
    // SECURITY NOTE: In a real-world production application, this endpoint would need
    // to be aggressively secured, for example, by checking for a specific API key or
    // an admin role from a session to ensure only authorized clients (like your dashboard)
    // can access this sensitive user data.

    const users = await prisma.user.findMany({
      // Select only the necessary fields to be displayed on the dashboard.
      // This prevents leaking sensitive user data.
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        // The createdAt field for a user is not standard in the Auth.js schema,
        // so we will rely on default ordering or sort by another field like name if needed.
        _count: {
          // Include a count of related orders for each user.
          select: { orders: true },
        },
      },
      // The 'orderBy' clause was removed because 'createdAt' does not exist on the User model.
    });

    // Return the list of users with a 200 OK status.
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    // If any error occurs during the database query, log it to the server
    // console for debugging and return a generic error message to the client.
    console.error("Failed to fetch users:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching users." },
      { status: 500 }
    );
  }
}
