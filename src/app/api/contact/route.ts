// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.name || !body.phone || !body.message) {
      return NextResponse.json(
        { error: 'Name, phone, and message are required' },
        { status: 400 }
      );
    }

    // Send to your backend API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact/submit`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Failed to submit contact form');
    }

    const data = await response.json();

    return NextResponse.json(
      { message: 'Contact form submitted successfully', data },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting contact form:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Optional: GET endpoint to fetch contact submissions (for admin)
export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication (implement as needed)
    const authHeader = request.headers.get('Authorization');
    
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/contact`, {
      headers: {
        'Authorization': authHeader || '',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch contact submissions');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching contact submissions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}