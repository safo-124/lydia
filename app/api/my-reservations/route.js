// File: apps/storefront/app/api/my-reservations/route.js
// This secure API endpoint fetches reservation history for the currently authenticated user.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth'; // Import the server-side auth utility

export async function GET(request) {
  const session = await auth();

  // If there's no session, the user is not authenticated.
  if (!session?.user?.id) {
    return NextResponse.json({ message: 'Not authenticated' }, { status: 401 });
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        // This is the crucial security filter: only return reservations
        // where the userId matches the session user's ID.
        userId: session.user.id,
      },
      orderBy: {
        reservationDate: 'desc', // Show their most recent reservations first
      },
    });

    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch user reservations:', error);
    return NextResponse.json(
      { message: 'Something went wrong while fetching your reservations.' },
      { status: 500 }
    );
  }
}