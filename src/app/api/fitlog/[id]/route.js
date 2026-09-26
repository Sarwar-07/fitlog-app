import { NextResponse } from 'next/server';
import fallbackWorkouts from '@/data/workouts.json';

export async function GET(request, { params }) {
  const { id } = await params;

  try {
    const res = await fetch(`https://api.abcz.workers.dev/api/fitlog/${id}`, {
      headers: {
        'Accept': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      const match = fallbackWorkouts.find((w) => String(w.id) === String(id));
      return NextResponse.json(match || fallbackWorkouts[0]);
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    const match = fallbackWorkouts.find((w) => String(w.id) === String(id));
    return NextResponse.json(match || fallbackWorkouts[0]);
  }
}