import { z } from "zod";

export const listLaunchQuerySchema = z.object({
  year: z.number().optional(),
  month: z.number().min(0).max(11).optional(),
});

export type ListLaunchQuerySchema = z.infer<typeof listLaunchQuerySchema>;
