import { z } from 'zod'

export const createUserSchemas = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido!"),
    phone: z.string().min(1, 'Número obrigatório!'),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
})

export const createUserSchemasAdmin = z.object({
    name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
    email: z.string().email("Email inválido!"),
    password: z.string().min(6, "A senha deve conter pelo menos 6 caracteres").regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
})



export const loginSchema = z.object({
    email: z.string().email("Email inválido!"),
    password: z.string().min(1, "Senha é obrigatória!")
})