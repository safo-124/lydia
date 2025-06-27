// File: apps/storefront/app/api/orders/[id]/route.js
// This file handles API requests for a *specific* order identified by its ID.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

/**
 * Handles PUT requests to update an existing order, specifically its status.
 * @param {Request} request - The incoming request object.
 * @param {object} context - Contains route parameters. `context.params.id` is the order's ID.
 * @returns {NextResponse} A response object with the updated order or an error.
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const body = await request.json();
    const { status } = body;

    // Validate that the provided status is one of the allowed enum values.
    const validStatuses = ['PENDING', 'ACCEPTED', 'PREPARING', 'COMPLETED', 'CANCELLED'];
    if (!status || !validStatuses.includes(status)) {
        return NextResponse.json({ message: 'Invalid status provided.' }, { status: 400 });
    }

    const updatedOrder = await prisma.order.update({
      where: { id: parseInt(id) },
      data: {
        status: status,
      },
    });

    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error('Failed to update order:', error);
    // Prisma's P2025 error code indicates that a record was not found to update.
    if (error.code === 'P2025') {
        return NextResponse.json({ message: 'Order not found.' }, { status: 404 });
    }
    return NextResponse.json(
      { message: 'Something went wrong while updating the order.' },
      { status: 500 }
    );
  }
}
