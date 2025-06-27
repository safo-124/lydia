// File: apps/storefront/app/api/contact/route.js
// This API endpoint handles submissions from the contact form.

import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields are required.' }, { status: 400 });
    }

    // In a real application, you would add logic here to:
    // 1. Sanitize the inputs.
    // 2. Send an email to your support address.
    // 3. Save the message to a database.
    
    // For now, we'll just log it to the server console.
    console.log('New Contact Form Submission:');
    console.log('Name:', name);
    console.log('Email:', email);
    console.log('Message:', message);

    return NextResponse.json({ message: 'Thank you for your message! We will get back to you soon.' }, { status: 200 });

  } catch (error) {
    console.error('Contact form submission error:', error);
    return NextResponse.json({ message: 'Something went wrong. Please try again later.' }, { status: 500 });
  }
}