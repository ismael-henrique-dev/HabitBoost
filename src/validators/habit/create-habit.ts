import { z } from 'zod'

export const createHabitFormSchema = z.object({
  title: z.string().min(1, 'O título é obrigatório.'),
  description: z.string().optional(),
  reminderTime: z.string().optional(),
  category: z.string().min(1, 'A categoria é obrigatória.'),
  days: z.array(z.number()).min(1, 'Selecione pelo menos um dia.'),
})

export type CreateHabitFormData = z.infer<typeof createHabitFormSchema>
