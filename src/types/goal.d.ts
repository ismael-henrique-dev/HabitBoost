export type Goal = {
  id: string
  createdAt: Date
  updatedAt?: Date
  title: string
  currentCount: number
  targetCount: number
  habitId: string
}
