import { z } from 'zod'

export const sendCodeFormSchema = z.object({
  code: z.string().min(6),
})

export type SendCodeFormData = z.infer<typeof sendCodeFormSchema>
