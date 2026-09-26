'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const WorkoutContext = createContext();

export const WorkoutProvider = ({ children }) => {
  const [todayPlan, setTodayPlan] = useState([]);
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [completedIds, setCompletedIds] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem('fitlog_today_plan');
      const storedSaved = localStorage.getItem('fitlog_saved');
      const storedDone = localStorage.getItem('fitlog_done');

      if (storedPlan) setTodayPlan(JSON.parse(storedPlan));
      if (storedSaved) setSavedWorkouts(JSON.parse(storedSaved));
      if (storedDone) setCompletedIds(JSON.parse(storedDone));
    } catch (err) {
      console.error('Failed to load storage:', err);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save changes to localStorage
  useEffect(() => {
    if (!isLoaded) return;
    localStorage.setItem('fitlog_today_plan', JSON.stringify(todayPlan));
    localStorage.setItem('fitlog_saved', JSON.stringify(savedWorkouts));
    localStorage.setItem('fitlog_done', JSON.stringify(completedIds));
  }, [todayPlan, savedWorkouts, completedIds, isLoaded]);

  // Add to Today's Plan (with 5-item cap)
  const addToPlan = (workout) => {
    if (todayPlan.length >= 5) {
      toast.error("Plan limit reached (maximum 5 lifts for today)!");
      return false;
    }
    if (todayPlan.some((item) => item.id === workout.id)) {
      toast.info("This lift is already in today's plan.");
      return false;
    }
    setTodayPlan((prev) => [...prev, workout]);
    toast.success("Added to today's plan!");
    return true;
  };

  // Save for Later
  const saveForLater = (workout) => {
    if (savedWorkouts.some((item) => item.id === workout.id)) {
      toast.info("This lift is already saved.");
      return false;
    }
    setSavedWorkouts((prev) => [...prev, workout]);
    toast.success("Saved for later!");
    return true;
  };

  // Remove workout from a list
  const removeFromPlan = (id) => {
    setTodayPlan((prev) => prev.filter((item) => item.id !== id));
    setCompletedIds((prev) => prev.filter((doneId) => doneId !== id));
    toast.info("Removed from today's plan.");
  };

  const removeFromSaved = (id) => {
    setSavedWorkouts((prev) => prev.filter((item) => item.id !== id));
    toast.info("Removed from saved.");
  };

  // Mark workout as done
  const markAsDone = (id) => {
    if (completedIds.includes(id)) {
      setCompletedIds((prev) => prev.filter((doneId) => doneId !== id));
      toast.info("Workout marked as incomplete.");
    } else {
      setCompletedIds((prev) => [...prev, id]);
      toast.success("Workout marked as done! Great job!");
    }
  };

  return (
    <WorkoutContext.Provider
      value={{
        todayPlan,
        savedWorkouts,
        completedIds,
        addToPlan,
        saveForLater,
        removeFromPlan,
        removeFromSaved,
        markAsDone,
      }}
    >
      {children}
    </WorkoutContext.Provider>
  );
};

export const useWorkout = () => useContext(WorkoutContext);