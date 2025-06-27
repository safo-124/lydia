// File: apps/storefront/app/api/reservations/[id]/route.js
// This API route handles updating the status of a specific reservation.

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import nodemailer from 'nodemailer';

// Nodemailer transport configuration using environment variables
const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: 465,
    secure: true, // Use SSL
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
});

/**
 * Handles PUT requests to update an existing reservation, specifically its status.
 * @param {Request} request The incoming request object.
 * @param {object} context Contains route parameters, like the reservation ID.
 * @returns {NextResponse} A response with the updated reservation or an error.
 */
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { status } = await request.json();

    // Validate that the provided status is one of the allowed enum values
    const validStatuses = ['PENDING', 'CONFIRMED', 'CANCELLED', 'COMPLETED'];
    if (!status || !validStatuses.includes(status)) {
      return NextResponse.json({ message: 'Invalid status provided.' }, { status: 400 });
    }

    // Update the reservation status in the database
    const updatedReservation = await prisma.reservation.update({
      where: { id: parseInt(id) },
      data: { status },
    });

    // --- Send Email Notification on Confirmation or Cancellation ---
    if (status === 'CONFIRMED' || status === 'CANCELLED') {
        const subject = status === 'CONFIRMED' 
            ? 'Your Reservation is Confirmed!' 
            : 'Update on Your Reservation';
            
        const text = status === 'CONFIRMED'
            ? `Hello ${updatedReservation.customerName},\n\nYour reservation for ${updatedReservation.partySize} guests on ${new Date(updatedReservation.reservationDate).toLocaleString()} has been confirmed. We look forward to seeing you!\n\nBest,\nGhana Jollof Hub`
            : `Hello ${updatedReservation.customerName},\n\nUnfortunately, your reservation request for ${new Date(updatedReservation.reservationDate).toLocaleString()} has been cancelled. Please contact us if you have any questions.\n\nBest,\nGhana Jollof Hub`;

        try {
            await transporter.sendMail({
                from: `Ghana Jollof Hub <${process.env.EMAIL_FROM}>`,
                to: updatedReservation.email,
                subject: subject,
                text: text,
            });
        } catch (emailError) {
            console.error("Failed to send confirmation email:", emailError);
            // Don't block the API response if email fails, just log the error.
        }
    }
    // --- End Email Notification ---

    return NextResponse.json(updatedReservation, { status: 200 });
  } catch (error) {
    console.error('Failed to update reservation status:', error);
    // Handle case where the reservation to update is not found
    if (error.code === 'P2025') {
      return NextResponse.json({ message: 'Reservation not found.' }, { status: 404 });
    }
    // Handle other potential errors
    return NextResponse.json({ message: 'Failed to update reservation status' }, { status: 500 });
  }
}
