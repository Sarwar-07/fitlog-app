import { NextResponse } from 'next/server';
import fallbackWorkouts from '@/data/workouts.json';

export async function GET() {
  try {
    const res = await fetch('https://api.abcz.workers.dev/api/fitlog', {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn(`External API returned status ${res.status}. Serving local fallback data.`);
      return NextResponse.json(fallbackWorkouts);
    }

    const data = await res.json();
    return NextResponse.json(Array.isArray(data) ? data : fallbackWorkouts);
  } catch (error) {
    console.warn('External API unreachable. Serving local fallback data:', error.message);
    return NextResponse.json(fallbackWorkouts);
  }
}