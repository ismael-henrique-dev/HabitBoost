type HabitStatus = 'unstarted' | 'concluded' | 'missed'

export type Habit = {
  id: string
  title: string
  description?: string
  status: HabitStatus
  reminderTime?: string
  categoryId: string
  days: number[]
  createdAt: string
  updatedAt: string | null
  completedAt: string | null
}