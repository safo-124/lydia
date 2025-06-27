// File: apps/storefront/app/api/stats/route.js
// This API endpoint calculates and returns key business metrics for the dashboard.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // In a real app, this should be secured so only dashboard admins can access it.

    // 1. Get total completed revenue
    const completedOrders = await prisma.order.aggregate({
      _sum: {
        totalPrice: true,
      },
      where: {
        status: 'COMPLETED',
      },
    });

    // 2. Get total number of orders
    const totalOrders = await prisma.order.count();

    // 3. Get total number of customers/users
    const totalCustomers = await prisma.user.count();
    
    // 4. Get today's orders
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Start of today
    
    const todaysOrdersCount = await prisma.order.count({
        where: {
            createdAt: {
                gte: today,
            },
        },
    });

    const stats = {
      totalRevenue: completedOrders._sum.totalPrice || 0,
      totalOrders,
      totalCustomers,
      todaysOrders: todaysOrdersCount,
    };

    return NextResponse.json(stats, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching stats." },
      { status: 500 }
    );
  }
}
