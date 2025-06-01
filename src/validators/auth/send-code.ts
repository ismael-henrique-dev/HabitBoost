import { z } from 'zod'

export const sendEmailFormSchema = z.object({
  email: z.string().email('Digite um email válido.'),
})

export type SendEmailFormData = z.infer<typeof sendEmailFormSchema>
