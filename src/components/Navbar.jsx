'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';

export default function Navbar() {
  const pathname = usePathname();
  const { todayPlan, savedWorkouts } = useWorkout();

  return (
    <header className="sticky top-0 z-50 bg-[#0c0d12]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2 text-white font-extrabold text-xl tracking-wider">
          <span className="w-7 h-7 rounded bg-[#ccff00] text-black font-black flex items-center justify-center text-sm">
            F
          </span>
          FITLOG
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm font-semibold transition-colors ${
              pathname === '/' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Workouts
          </Link>
          <Link
            href="/my-plan"
            className={`text-sm font-semibold transition-colors ${
              pathname === '/my-plan' ? 'text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            My Plan
          </Link>
        </nav>

        {/* Counter Badges (Both link to /my-plan) */}
        <div className="flex items-center gap-3">
          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 bg-[#ccff00] text-black px-3 py-1 rounded-full text-xs font-bold hover:brightness-105 transition-all"
          >
            <span>Plan</span>
            <span className="w-4 h-4 rounded-full bg-black/10 flex items-center justify-center">
              {todayPlan.length}
            </span>
          </Link>

          <Link
            href="/my-plan"
            className="flex items-center gap-1.5 border border-slate-700 text-slate-200 px-3 py-1 rounded-full text-xs font-semibold hover:border-slate-500 transition-colors"
          >
            <span>Saved</span>
            <span>{savedWorkouts.length}</span>
          </Link>
        </div>

      </div>
    </header>
  );
}