import { createContext, useContext, useState } from 'react'
import { Habit } from '@/types/habit'

type HabitContextData = {
  habits: Habit[]
  createHabit: (habit: Habit) => void
  updateHabit: (id: string, habit: Partial<Habit>) => void
  deleteHabit: (id: string) => void
  completeHabit: (id: string) => void
}

const HabitContext = createContext<HabitContextData>({} as HabitContextData)

export function HabitProvider({ children }: { children: React.ReactNode }) {
  const [habits, setHabits] = useState<Habit[]>([])

  function createHabit(habit: Habit) {
    setHabits((prev) => [...prev, habit])
  }

  function updateHabit(id: string, habit: Partial<Habit>) {}

  function deleteHabit(id: string) {}

  function completeHabit(id: string) {}

  return (
    <HabitContext.Provider
      value={{ habits, createHabit, deleteHabit, updateHabit, completeHabit }}
    >
      {children}
    </HabitContext.Provider>
  )
}

export function useHabit() {
  const context = HabitContext
  if (!context) {
    throw new Error('useHabit must be used within a HabitProvider')
  }
  return useContext(context)
}
