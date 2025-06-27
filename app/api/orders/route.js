// File: apps/storefront/app/api/orders/route.js
// This file handles API requests for creating new orders (POST) and fetching all orders (GET).
// It also integrates with Socket.IO to emit real-time events for new orders.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth'; // Server-side auth utility

/**
 * Handles GET requests to fetch all orders from the database.
 * This is used by the dashboard to display the list of all incoming orders.
 * @param {Request} request The incoming request object.
 * @returns {NextResponse} A JSON response containing the list of orders.
 */
export async function GET(request) {
  try {
    // SECURITY NOTE: In a production app, this should be protected to ensure
    // only authenticated staff from the dashboard can access this list.
    const orders = await prisma.order.findMany({
      orderBy: { 
        createdAt: 'desc' // Show newest orders first
      },
      // Include related user data for orders placed by signed-in customers.
      include: { 
        user: { 
          select: { name: true, image: true } 
        } 
      },
    });
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ message: 'Something went wrong while fetching orders.' }, { status: 500 });
  }
}


/**
 * Handles POST requests to create a new order.
 * After successfully creating an order, it emits a 'new_order' event via Socket.IO.
 * @param {Request} request The incoming request object containing order details.
 * @returns {NextResponse} A JSON response with the newly created order data.
 */
export async function POST(request) {
  // Get the current user's session, if they are logged in.
  const session = await auth();

  try {
    const body = await request.json();
    const { customerName, totalPrice, items } = body;

    // Validate incoming data.
    if (!customerName || !totalPrice || !items || !items.length) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    // Prepare the data payload for creating the new order in the database.
    const orderData = {
      customerName,
      totalPrice: parseFloat(totalPrice),
      items, // Prisma handles JSON serialization
      status: 'PENDING',
      // If a user is logged in, connect this order to their user ID.
      ...(session?.user?.id && {
        user: { 
          connect: { id: session.user.id } 
        },
      }),
    };

    // Create the order in the database.
    const newOrder = await prisma.order.create({
      data: orderData,
      include: { user: { select: { name: true, image: true } } }, // Include user data for the real-time event
    });

    // --- SOCKET.IO EMIT ---
    // Access the global socket.io instance (initialized in /api/socket)
    // and emit the 'new_order' event to all connected dashboard clients.
    if (global.io) {
      global.io.emit('new_order', newOrder);
    } else {
      console.warn('Socket.io server not running. Cannot emit new order event.');
    }
    // --- END SOCKET.IO EMIT ---

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ message: 'Something went wrong while placing the order.' }, { status: 500 });
  }
}
