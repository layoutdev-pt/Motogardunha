import { z } from 'zod'

export const orderSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(9, 'Número de telefone é obrigatório'),
  notes: z.string().optional(),
})

export type OrderFormData = z.infer<typeof orderSchema>
