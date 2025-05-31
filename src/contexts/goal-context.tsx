import { createContext, useContext, useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Goal } from '@/types/goal'

type GoalContextData = {
  goals: Goal[]
  createGoal: (goal: Goal) => void
  updateGoal: (id: string, updatedGoal: Goal) => void
  deleteGoal: (id: string) => void
  completeGoal: (id: string) => void
}

const GoalContext = createContext<GoalContextData>({} as GoalContextData)

export function GoalProvider({ children }: { children: React.ReactNode }) {
  const [goals, setGoals] = useState<Goal[]>([])

  useEffect(() => {
    async function loadGoals() {
      const storedGoals = await AsyncStorage.getItem('@goalList')
      if (storedGoals) {
        setGoals(JSON.parse(storedGoals))
      }
    }

    loadGoals()
  }, [])

  async function saveGoals(updatedGoals: Goal[]) {
    setGoals(updatedGoals)
    await AsyncStorage.setItem('@goalList', JSON.stringify(updatedGoals))
  }

  function createGoal(goal: Goal) {
    const updatedGoals = [...goals, goal]
    saveGoals(updatedGoals)
  }

  function updateGoal(id: string, updatedGoal: Goal) {
    const updatedGoals = goals.map((goal) =>
      goal.id === id ? updatedGoal : goal
    )
    saveGoals(updatedGoals)
  }

  function deleteGoal(id: string) {
    const updatedGoals = goals.filter((goal) => goal.id !== id)
    saveGoals(updatedGoals)
  }

  function completeGoal(id: string) {
    const updatedGoals = goals.map((goal) => {
      if (goal.id === id) {
        return {
          ...goal,
          currentCount: goal.currentCount + 1,
        }
      }
      return goal
    })
    saveGoals(updatedGoals)
  }

  return (
    <GoalContext.Provider
      value={{ goals, createGoal, updateGoal, deleteGoal, completeGoal }}
    >
      {children}
    </GoalContext.Provider>
  )
}

export function useGoal() {
  const context = useContext(GoalContext)
  if (!context) {
    throw new Error('useGoal must be used within a GoalProvider')
  }
  return context
}
