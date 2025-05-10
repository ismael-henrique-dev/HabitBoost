import { z } from 'zod'

export const updateGoalFormSchema = z
  .object({
    title: z
      .string()
      .min(3, 'O nome da meta deve ter pelo menos 3 caracteres.'),
    currentCount: z.number().min(1, 'A meta deve ter pelo menos 1 repetição.'),
    targetCount: z.number().min(1, 'A meta deve ter pelo menos 1 repetição.'),
  })
  .refine((data) => data.currentCount <= data.targetCount, {
    message: 'O progresso atual não pode ser maior que a meta.',
    path: ['currentCount'],
  })

export type UpdateGoalFormData = z.infer<typeof updateGoalFormSchema>
