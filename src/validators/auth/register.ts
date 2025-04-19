import { z } from 'zod'

export const registerFormSchema = z
  .object({
    email: z.string().email('Digite um email válido.'),
    password: z.string().min(6, 'A senha deve conter pelo menos 6 caracteres.'),
    username: z.string().min(3, 'O nome precisa ter pelo menos 3 caracteres.'),
    confirmPassword: z.string().min(6, 'Confirme sua senha.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas precisam coincidir.',
    path: ['confirmPassword'],
  })

export type RegisterFormData = z.infer<typeof registerFormSchema>
export type RegisterFormDataWithoutConfirmPassword = Omit<RegisterFormData, 'confirmPassword'>