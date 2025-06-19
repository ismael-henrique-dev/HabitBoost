import { z } from 'zod'

export const updateUserPasswordFormSchema = z
  .object({
    oldPassword: z
      .string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
    newPassword: z
      .string()
      .min(6, 'A senha precisa ter pelo menos 6 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'As senhas precisam coincidir.',
    path: ['confirmPassword'],
  })

export type UpdateUserPasswordFormSchema = z.infer<
  typeof updateUserPasswordFormSchema
>
