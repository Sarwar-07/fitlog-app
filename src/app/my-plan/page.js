'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useWorkout } from '@/context/WorkoutContext';

export default function MyPlanPage() {
  const [activeTab, setActiveTab] = useState('plan'); // 'plan' | 'saved'
  const [sortBy, setSortBy] = useState('duration'); // 'duration' | 'calories' | 'rating'
  const { todayPlan, savedWorkouts, completedIds, markAsDone, removeFromPlan, removeFromSaved } = useWorkout();

  // Metrics summary calculated live from today's plan
  const totalExercises = todayPlan.length;
  const totalMinutes = todayPlan.reduce((acc, curr) => acc + (Number(curr.duration) || 0), 0);
  const totalCalories = todayPlan.reduce((acc, curr) => acc + (Number(curr.calories) || 0), 0);

  // Active list according to selected tab
  const rawList = activeTab === 'plan' ? todayPlan : savedWorkouts;

  // Sorted list (Challenge C1)
  const sortedList = [...rawList].sort((a, b) => {
    if (sortBy === 'duration') return (b.duration || 0) - (a.duration || 0);
    if (sortBy === 'calories') return (b.calories || 0) - (a.calories || 0);
    if (sortBy === 'rating') return (b.rating || 0) - (a.rating || 0);
    return 0;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white min-h-[80vh]">
      {/* Header */}
      <div>
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">MY PLAN</h1>
        <p className="text-slate-400 text-sm mt-1">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </div>

      {/* Metrics Summary Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
        <div className="bg-[#12151f] border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 font-medium">Exercises</span>
          <p className="text-4xl font-extrabold text-[#ccff00] mt-1">{totalExercises}</p>
        </div>
        <div className="bg-[#12151f] border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 font-medium">Minutes</span>
          <p className="text-4xl font-extrabold text-white mt-1">{totalMinutes}</p>
        </div>
        <div className="bg-[#12151f] border border-slate-800 rounded-xl p-5">
          <span className="text-xs text-slate-400 font-medium">Calories</span>
          <p className="text-4xl font-extrabold text-white mt-1">{totalCalories}</p>
        </div>
      </div>

      {/* Controls: Tabs & Sort Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-10 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 bg-[#12151f] p-1 rounded-lg border border-slate-800 w-fit">
          <button
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
              activeTab === 'plan' ? 'bg-[#1e2333] text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Today&apos;s Plan
          </button>
          <button
            onClick={() => setActiveTab('saved')}
            className={`px-4 py-1.5 rounded-md text-xs font-bold transition-colors ${
              activeTab === 'saved' ? 'bg-[#1e2333] text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Saved
          </button>
        </div>

        {/* Sort By Dropdown */}
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <span>Sort By</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-[#12151f] border border-slate-700 text-white rounded-lg px-2.5 py-1.5 text-xs focus:outline-none focus:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Workout List or Empty State */}
      <div className="mt-6 space-y-4">
        {sortedList.length === 0 ? (
          <div className="bg-[#12151f] border border-dashed border-slate-800 rounded-2xl py-16 px-4 text-center">
            <h3 className="text-lg font-bold text-white uppercase tracking-tight">NOTHING HERE YET</h3>
            <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
              Browse the library and add a lift to get today moving.
            </p>
            <Link
              href="/"
              className="inline-block mt-5 px-5 py-2.5 rounded-lg bg-[#ccff00] text-black font-bold text-xs uppercase hover:brightness-110 transition-all"
            >
              Go to workouts
            </Link>
          </div>
        ) : (
          sortedList.map((item) => {
            const isDone = completedIds.includes(item.id);

            return (
              <div
                key={item.id}
                className={`bg-[#12151f] border rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 transition-all ${
                  isDone ? 'border-emerald-500/40 bg-emerald-950/10' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-slate-800 flex-shrink-0">
                    <img
                      src={item.image || 'https://placehold.co/100x100/141721/ffffff?text=Lift'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm sm:text-base uppercase ${isDone ? 'line-through text-slate-500' : 'text-white'}`}>
                      {item.name}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.equipment}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-slate-400">
                      <span>⏱ {item.duration} min</span>
                      <span>🔥 {item.calories} kcal</span>
                      <span>★ {item.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="flex items-center gap-2 self-end md:self-auto">
                  <Link
                    href={`/workouts/${item.id}`}
                    className="px-3.5 py-1.5 rounded-lg border border-slate-700 text-xs font-semibold text-slate-300 hover:border-slate-500 transition-colors"
                  >
                    View Details
                  </Link>

                  {activeTab === 'plan' && (
                    <button
                      onClick={() => markAsDone(item.id)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1 transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-black'
                          : 'bg-[#ccff00] text-black hover:brightness-105'
                      }`}
                    >
                      ✔ {isDone ? 'Done' : 'Mark as Done'}
                    </button>
                  )}

                  <button
                    onClick={() => (activeTab === 'plan' ? removeFromPlan(item.id) : removeFromSaved(item.id))}
                    className="p-2 text-slate-400 hover:text-rose-400 transition-colors"
                    title="Remove workout"
                  >
                    ✕
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}