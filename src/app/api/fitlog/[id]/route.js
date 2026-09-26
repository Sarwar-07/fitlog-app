import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workout details: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API details proxy error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}