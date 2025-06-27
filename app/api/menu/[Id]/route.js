// File: apps/storefront/app/api/menu/[id]/route.js
// This file handles API requests for a *specific* menu item identified by its ID.
// It manages fetching (GET), updating (PUT), and deleting (DELETE) a single menu item.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Handles GET requests to fetch a single menu item by its ID.
 * @param {Request} request - The incoming request object.
 * @param {object} context - Contains route parameters. `context.params.id` is the menu item's ID.
 * @returns {NextResponse} A response object with the menu item data or an error.
 */
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const menuItem = await prisma.menuItem.findUnique({
      where: { id: parseInt(id) },
    });

    if (!menuItem) {
      return NextResponse.json(
        { message: 'Menu item not found.' },
        { status: 404 }
      );
    }

    return NextResponse.json(menuItem, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch menu item:', error);
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

/**
 * Handles PUT requests to update an existing menu item.
 * @param {Request} request - The incoming request object with the update data in its body.
 * @param {object} context - Contains route parameters, including the ID of the item to update.
 * @returns {NextResponse} A response object with the updated menu item or an error.
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { name, description, price, category, imageUrl } = body;

    const updatedItem = await prisma.menuItem.update({
      where: { id: parseInt(id) },
      data: {
        name,
        description,
        price: price ? parseFloat(price) : undefined,
        category,
        imageUrl,
      },
    });

    return NextResponse.json(updatedItem, { status: 200 });
  } catch (error) {
    console.error('Failed to update menu item:', error);
    // Prisma's P2025 error code indicates that a record was not found.
    if (error.code === 'P2025') {
        return NextResponse.json({ message: 'Menu item not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

/**
 * Handles DELETE requests to remove a menu item.
 * @param {Request} request - The incoming request object.
 * @param {object} context - Contains route parameters, including the ID of the item to delete.
 * @returns {NextResponse} A response object confirming deletion or an error.
 */
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    await prisma.menuItem.delete({
      where: { id: parseInt(id) },
    });

    return NextResponse.json({ message: 'Menu item deleted successfully.' }, { status: 200 });
  } catch (error) {
    console.error('Failed to delete menu item:', error);
    if (error.code === 'P2025') {
        return NextResponse.json({ message: 'Menu item not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Something went wrong.' },
      { status: 500 }
    );
  }
}
