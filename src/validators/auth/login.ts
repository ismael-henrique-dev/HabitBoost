import { z } from 'zod'

export const loginFormSchema = z.object({
  email: z.string().email('Digite um email válido.'),
  password: z.string().min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
})

export type LoginFormData = z.infer<typeof loginFormSchema>
