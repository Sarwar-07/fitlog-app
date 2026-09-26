import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch workouts: ${res.status}`);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API proxy error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}