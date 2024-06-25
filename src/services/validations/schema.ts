import { z } from 'zod'

export const userBodySchema = z.object({
    birthday: z.string().min(10, { message: "O nome completo dever ter no minimo 3 caracteres" }),
    username: z.string().min(3, { message: "O nome de usuário dever ter no minimo 3 caracteres" }),
    email: z.string().email({ message: "O e-mail deve ser válido" }),
    password: z.string().min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
})
