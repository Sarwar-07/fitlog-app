'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import fallbackWorkouts from '@/data/workouts.json';

export default function HomePage() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const res = await fetch('/api/fitlog');
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          setWorkouts(data);
        } else if (data && Array.isArray(data.data) && data.data.length > 0) {
          setWorkouts(data.data);
        } else if (data && Array.isArray(data.workouts) && data.workouts.length > 0) {
          setWorkouts(data.workouts);
        } else {
          setWorkouts(fallbackWorkouts);
        }
      } catch (err) {
        console.warn('Using local fallback workouts due to fetch error:', err);
        setWorkouts(fallbackWorkouts);
      } finally {
        setLoading(false);
      }
    }
    loadWorkouts();
  }, []);

  return (
    <div className="min-h-screen bg-[#0d0f15] text-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-4">
          <span className="text-xs uppercase tracking-widest text-[#ccff00] font-bold">
            WORKOUT LIBRARY
          </span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase leading-none">
            TRAIN WITH INTENT. <br /> LOG EVERY SET.
          </h1>
          <p className="text-slate-400 text-sm sm:text-base max-w-xl leading-relaxed">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
          </p>
          <div className="pt-4">
            <a
              href="#library"
              className="inline-flex items-center gap-2 bg-[#ccff00] text-black font-bold text-xs uppercase px-6 py-3 rounded-lg hover:brightness-110 active:scale-95 transition-all"
            >
              BROWSE WORKOUTS ↓
            </a>
          </div>
        </div>

        {/* Hero Illustration */}
        {/* Hero Illustration */}
        <div className="lg:col-span-5 flex justify-center items-center">
          <div className="w-full max-w-md h-72 sm:h-96 flex items-center justify-center">
            <img
              src="/banner.png"
              alt="Gym training banner"
              className="max-h-full max-w-full object-contain drop-shadow-[0_10px_25px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      {/* The Library Section */}
      <section id="library" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-slate-800/80">
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">THE LIBRARY</h2>
          <p className="text-slate-400 text-sm mt-1">Twelve lifts covering every major muscle group.</p>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-slate-400">
            <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium">Loading exercises...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {(Array.isArray(workouts) ? workouts : []).map((workout) => (
              <Link
                key={workout.id}
                href={`/workouts/${workout.id}`}
                className="group bg-[#131620] border border-slate-800/80 rounded-xl overflow-hidden hover:border-slate-700 transition-all flex flex-col justify-between"
              >
                <div className="h-44 w-full bg-[#1b202e] overflow-hidden">
                  <img
                    src={workout.image || 'https://placehold.co/400x250/141721/ffffff?text=Workout'}
                    alt={workout.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Category Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-2.5">
                      {(workout.category || []).map((cat, i) => (
                        <span
                          key={i}
                          className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                        >
                          {cat}
                        </span>
                      ))}
                    </div>

                    <h3 className="font-extrabold text-white text-base uppercase tracking-tight group-hover:text-[#ccff00] transition-colors">
                      {workout.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-1">{workout.equipment}</p>
                  </div>

                  {/* Stats Row */}
                  <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <span>⏱ {workout.duration} min</span>
                    <span>🔥 {workout.calories} kcal</span>
                    <span>★ {workout.rating}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}