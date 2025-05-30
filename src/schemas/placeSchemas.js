import { z } from 'zod'

export const placeSchemas = z.object({
    name: z.string().min(3, "É necessário conter pelo menos 3 caracteres"),
    description: z.string().min(10),
    address: z.string(),
    type: z.enum(["hotel", "pousada", "casa", "restaurante", "passeio", "outro"]),
    rating: z.number().min(0).max(5),
    priceRange: z.string()
})