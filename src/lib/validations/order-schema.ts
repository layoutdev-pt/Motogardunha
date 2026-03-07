import { z } from 'zod'

const orderItemSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive().max(100),
  image: z.string(),
})

export const orderRequestSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(9, 'Número de telefone é obrigatório'),
  address: z.string().max(500).optional(),
  notes: z.string().max(1000).optional(),
  items: z.array(orderItemSchema).min(1, 'Pelo menos um item é obrigatório').max(50),
  total: z.number().nonnegative(),
})

export const orderSchema = z.object({
  name: z.string().min(2, 'Nome é obrigatório'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  phone: z.string().min(9, 'Número de telefone é obrigatório'),
  notes: z.string().optional(),
})

export type OrderFormData = z.infer<typeof orderSchema>
export type OrderRequest = z.infer<typeof orderRequestSchema>
