'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useWorkout } from '@/context/WorkoutContext';
import fallbackWorkouts from '@/data/workouts.json';

export default function WorkoutDetailPage() {
  const { id } = useParams();
  const { addToPlan, saveForLater } = useWorkout();
  const [workout, setWorkout] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await fetch(`/api/fitlog/${id}`);
        const data = await res.json();
        if (data && data.name) {
          setWorkout(data);
        } else {
          const match = fallbackWorkouts.find((w) => String(w.id) === String(id));
          setWorkout(match || fallbackWorkouts[0]);
        }
      } catch (err) {
        console.warn('Error loading detail, using local fallback:', err);
        const match = fallbackWorkouts.find((w) => String(w.id) === String(id));
        setWorkout(match || fallbackWorkouts[0]);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchDetail();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-[#ccff00] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!workout) {
    return (
      <div className="text-center py-24 text-slate-400">
        Workout not found.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column: Media */}
        <div className="lg:col-span-5">
          <div className="rounded-2xl overflow-hidden border border-slate-800 bg-[#131620]">
            <img
              src={workout.image || 'https://placehold.co/600x600/141721/ffffff?text=Workout'}
              alt={workout.name}
              className="w-full h-auto object-cover max-h-[520px]"
            />
          </div>
        </div>

        {/* Right Column: Information & Specs */}
        <div className="lg:col-span-7 space-y-6 text-white">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
              {workout.name}
            </h1>
            <p className="text-slate-400 text-sm mt-2 leading-relaxed">
              {workout.description}
            </p>
            <div className="flex flex-wrap gap-2 mt-4">
              {(workout.category || []).map((cat, idx) => (
                <span
                  key={idx}
                  className="text-xs font-semibold px-3 py-1 rounded-md bg-[#181c26] text-slate-300"
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          {/* Key Specs Table */}
          <div className="border border-slate-800 rounded-xl bg-[#11141d] divide-y divide-slate-800 text-xs">
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">EQUIPMENT</span>
              <span className="font-medium text-white">{workout.equipment}</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">DIFFICULTY</span>
              <span className="font-medium text-white">{workout.difficulty || 'Intermediate'}</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">SETS</span>
              <span className="font-medium text-white">{workout.sets || '4'}</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">REPS</span>
              <span className="font-medium text-white">{workout.reps || '6-8'}</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">DURATION</span>
              <span className="font-medium text-white">{workout.duration} min</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">CALORIES</span>
              <span className="font-medium text-white">{workout.calories} kcal</span>
            </div>
            <div className="p-3.5 flex justify-between items-center">
              <span className="text-slate-400 uppercase font-semibold">RATING</span>
              <span className="font-medium text-white">{workout.rating}</span>
            </div>
          </div>

          {/* Instructions */}
          <div>
            <h3 className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-3">
              INSTRUCTIONS
            </h3>
            <ol className="space-y-2 text-sm text-slate-300 list-decimal list-inside leading-relaxed">
              {(workout.instructions || [
                "Lie on the bench with eyes under the bar and feet planted.",
                "Unrack with locked elbows and lower the bar to mid-chest.",
                "Press up in a slight arc until elbows lock without bouncing.",
                "Keep shoulder blades pinched and a natural arch in the back."
              ]).map((step, idx) => (
                <li key={idx} className="pl-1">
                  {step}
                </li>
              ))}
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              onClick={() => addToPlan(workout)}
              className="py-3 px-6 rounded-lg bg-[#ccff00] text-black font-extrabold text-xs uppercase tracking-wider hover:brightness-110 active:scale-95 transition-all cursor-pointer shadow-md"
            >
              Add to today&apos;s plan
            </button>
            <button
              type="button"
              onClick={() => saveForLater(workout)}
              className="py-3 px-6 rounded-lg bg-[#141722] border border-slate-700 hover:border-slate-500 text-white font-extrabold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Save for later
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}