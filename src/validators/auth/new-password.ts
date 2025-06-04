import { z } from 'zod'

export const newPasswordFormSchema = z
  .object({
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam coincidir.',
    path: ['confirmPassword'],
  })

export type NewPasswordFormData = z.infer<typeof newPasswordFormSchema>

