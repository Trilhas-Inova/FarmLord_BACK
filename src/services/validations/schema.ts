import { z } from 'zod'

export const userBodySchema = z.object({
    fullname: z.string(),
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(8)
})
