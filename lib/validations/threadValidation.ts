import * as z from 'zod';

export const threadValidations = z.object({
   thread: z.string().min(3),
   accountId: z.string().min(12)
})

export const commentValidations = z.object({
   comment: z.string().min(3),
})