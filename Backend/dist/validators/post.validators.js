import { z } from "zod";
export const createPostBodySchema = z.object({
    title: z.string().min(1).max(200),
    content: z.string().min(1).max(5000),
});
export const searchQuerySchema = z.object({
    q: z.string().min(1).max(100),
});
