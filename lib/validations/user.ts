import * as z from 'zod';

export const userValidations = z.object({
    profile_photo : z.string().min(1),
    name: z.string().min(1),
    username: z.string().min(1).max(40),
    bio: z.string().min(4).max(500)
})