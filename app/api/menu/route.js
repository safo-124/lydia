// File: apps/storefront/app/api/menu/route.js
// This file defines the API endpoints for /api/menu.
// It handles fetching all menu items (GET) and creating a new one (POST).

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Using the @/ alias to import the Prisma client

/**
 * Handles GET requests to fetch all menu items.
 * @param {Request} request - The incoming Next.js request object.
 * @returns {NextResponse} A response object containing the list of menu items or an error message.
 */
export async function GET(request) {
  try {
    // Use the imported Prisma client to fetch all records from the MenuItem table in the database.
    const menuItems = await prisma.menuItem.findMany();

    // If successful, return the fetched data as a JSON response with a 200 OK status.
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    // If an error occurs during the database operation, log it to the server console for debugging.
    console.error("Failed to fetch menu items:", error);

    // Return a user-friendly error response to the client with a 500 Internal Server Error status.
    return NextResponse.json(
      { message: "Something went wrong fetching the menu." },
      { status: 500 }
    );
  }
}

/**
 * Handles POST requests to create a new menu item.
 * @param {Request} request - The incoming request object, which should contain the new menu item data in its body.
 * @returns {NextResponse} A response object containing the newly created item or an error message.
 */
export async function POST(request) {
  try {
    // Parse the JSON body from the incoming request to get the new item's data.
    const body = await request.json();
    const { name, description, price, category, imageUrl } = body;

    // Perform basic server-side validation to ensure all required fields are present.
    if (!name || !description || !price || !category) {
        return NextResponse.json(
            { message: "Missing required fields: name, description, price, category." },
            { status: 400 } // 400 Bad Request status for client errors.
        );
    }

    // Use Prisma's `create` method to add a new record to the MenuItem table.
    const newItem = await prisma.menuItem.create({
      data: {
        name,
        description,
        price: parseFloat(price), // Ensure the price is stored as a floating-point number.
        category,
        imageUrl, // Can be null or an empty string if not provided
      },
    });

    // Return the newly created item data with a 201 Created status, indicating success.
    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    // Log any unexpected errors to the server console.
    console.error("Failed to create menu item:", error);

    // Return a generic error message to the client.
    return NextResponse.json(
      { message: "Something went wrong creating the menu item." },
      { status: 500 }
    );
  }
}
