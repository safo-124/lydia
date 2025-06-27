// File: apps/storefront/app/api/charts/weekly-revenue/route.js
// This API endpoint calculates and returns the total revenue for each of the last 7 days.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET(request) {
  try {
    // In a real app, this should be secured.
    
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0);

    // Fetch all completed orders from the last 7 days
    const orders = await prisma.order.findMany({
      where: {
        status: 'COMPLETED',
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
      select: {
        createdAt: true,
        totalPrice: true,
      },
    });

    // Process the data into a daily summary
    const dailyRevenue = {};
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const formattedDate = d.toISOString().split('T')[0]; // YYYY-MM-DD
      dailyRevenue[formattedDate] = { revenue: 0, day: d.toLocaleDateString('en-US', { weekday: 'short' }) };
    }

    orders.forEach(order => {
      const formattedDate = order.createdAt.toISOString().split('T')[0];
      if (dailyRevenue[formattedDate]) {
        dailyRevenue[formattedDate].revenue += order.totalPrice;
      }
    });
    
    // Convert to an array and sort by date
    const chartData = Object.entries(dailyRevenue)
        .map(([date, { revenue, day }]) => ({ name: day, revenue }))
        .reverse();

    return NextResponse.json(chartData, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch chart data:", error);
    return NextResponse.json(
      { message: "Something went wrong while fetching chart data." },
      { status: 500 }
    );
  }
}