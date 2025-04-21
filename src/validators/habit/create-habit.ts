import { z } from 'zod'

export const createHabitFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  description: z.string().optional(),
  reminderTime: z.string().optional(),
  category: z.string().min(1, 'A categoria é obrigatória.'),
  days: z
    .record(
      z.string(),
      z.object({
        selected: z.boolean(),
      })
    )
    .refine((days) => Object.keys(days).length > 0, {
      message: 'Selecione pelo menos um dia.',
    }),
})

export type CreateHabitFormData = z.infer<typeof createHabitFormSchema>
