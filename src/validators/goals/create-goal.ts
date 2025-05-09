import { z } from 'zod'

export const createGoalFormSchema = z.object({
  title: z.string().min(3, 'O nome da meta deve ter pelo menos 3 caracteres.'),
  targetCount: z.number().min(1, 'A meta deve ter pelo menos 1 repetição.')
})

export type CreateGoalFormData = z.infer<typeof createGoalFormSchema>
