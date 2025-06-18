import { z } from 'zod'

export const updateUsernameFormSchema = z.object({
  oldUsername: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.'),
  newUsername: z
    .string()
    .min(3, 'O nome de usuário deve ter pelo menos 3 caracteres.'),
})

export type UpdateUsernameFormSchema = z.infer<typeof updateUsernameFormSchema>
