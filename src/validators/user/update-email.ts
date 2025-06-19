import { z } from 'zod'

export const updateUserEmailFormSchema = z.object({
  oldEmail: z.string().email('Digite um email válido.'),
  newEmail: z.string().email('Digite um email válido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
})

export type UpdateUserEmailFormSchema = z.infer<
  typeof updateUserEmailFormSchema
>
