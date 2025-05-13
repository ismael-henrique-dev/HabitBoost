import { z } from 'zod'

export const createCategoryFormSchema = z.object({
  name: z.string().min(3, 'O nome da categoria deve ter pelo menos 3 caracteres.'),
})

export type CreateCategoryFormData = z.infer<typeof createCategoryFormSchema>
