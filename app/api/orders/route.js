// File: apps/storefront/app/api/orders/route.js
// Updated to handle both creating (POST) and fetching (GET) orders.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

/**
 * Handles GET requests to fetch all orders.
 * It includes related user data (name, image) for display on the dashboard.
 * @param {Request} request
 * @returns {NextResponse}
 */
export async function GET(request) {
  try {
    // In a real app, you would add security checks here to ensure
    // only authenticated dashboard users can access this.
    const orders = await prisma.order.findMany({
      orderBy: {
        createdAt: 'desc', // Show the newest orders first
      },
      include: {
        // Include the related user's info for orders placed by signed-in customers
        user: {
          select: {
            name: true,
            image: true,
          },
        },
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
 * If the user is authenticated, it links the order to their user ID.
 * @param {Request} request
 * @returns {NextResponse}
 */
export async function POST(request) {
  const session = await auth();

  try {
    const body = await request.json();
    const { customerName, totalPrice, items } = body;

    if (!customerName || !totalPrice || !items || !items.length) {
      return NextResponse.json({ message: 'Missing required fields.' }, { status: 400 });
    }

    const orderData = {
      customerName,
      totalPrice: parseFloat(totalPrice),
      items,
      status: 'PENDING',
      ...(session?.user?.id && {
        user: {
          connect: {
            id: session.user.id,
          },
        },
      }),
    };

    const newOrder = await prisma.order.create({
      data: orderData,
    });

    return NextResponse.json(newOrder, { status: 201 });
  } catch (error) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ message: 'Something went wrong while placing the order.' }, { status: 500 });
  }
}
