import { z } from 'zod'

export const habitFormSchema = z.object({
  title: z.string().nonempty('O título precisa ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  reminderTime: z.string().optional(),
  category: z.string().min(1, 'A categoria é obrigatória.'),
  days: z
    .record(
      z.object({
        selected: z.boolean(),
      })
    )
    .refine((days) => Object.values(days).some((day) => day.selected), {
      message: 'Selecione pelo menos um dia.',
    }),
})

export type HabitFormData = z.infer<typeof habitFormSchema>
