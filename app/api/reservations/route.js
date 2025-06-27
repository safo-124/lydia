// File: apps/storefront/app/api/reservations/route.js
// This API route handles fetching all reservations and creating new ones.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { auth } from '@/auth';

// Handles POST requests to create a new reservation
export async function POST(request) {
  const session = await auth();
  try {
    const body = await request.json();
    const { customerName, email, phone, reservationDate, partySize, notes } = body;
    if (!customerName || !email || !phone || !reservationDate || !partySize) {
      return NextResponse.json({ message: 'Please fill out all required fields.' }, { status: 400 });
    }
    const newReservation = await prisma.reservation.create({
      data: {
        customerName, email, phone,
        reservationDate: new Date(reservationDate),
        partySize: parseInt(partySize),
        notes,
        status: 'PENDING',
        ...(session?.user?.id && { user: { connect: { id: session.user.id } } }),
      },
    });
    return NextResponse.json(newReservation, { status: 201 });
  } catch (error) {
    console.error('Failed to create reservation:', error);
    return NextResponse.json({ message: 'Something went wrong while making your reservation.' }, { status: 500 });
  }
}

// Handles GET requests to fetch all reservations for the dashboard
export async function GET(request) {
  try {
    // In a real app, this should be secured.
    const reservations = await prisma.reservation.findMany({
      orderBy: {
        reservationDate: 'asc', // Show upcoming reservations first
      },
      include: {
        user: { select: { name: true, image: true } },
      },
    });
    return NextResponse.json(reservations, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch reservations:', error);
    return NextResponse.json({ message: 'Failed to fetch reservations' }, { status: 500 });
  }
}