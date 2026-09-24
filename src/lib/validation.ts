import { z } from "zod";

export const contactMessageSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.email(),
  company: z.string().trim().max(120).optional(),
  projectType: z.string().trim().max(80).optional(),
  message: z.string().trim().min(10).max(5000)
});

export type ContactMessageInput = z.infer<typeof contactMessageSchema>;
