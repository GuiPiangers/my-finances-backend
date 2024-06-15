import { z } from "zod";

export const listLaunchQuerySchema = z.object({
  year: z
    .string()
    .optional()
    .refine((value) => (value ? typeof +value === "number" : true)),
  month: z
    .string()
    .optional()
    .refine((value) => (value ? typeof +value === "number" : true)),
});

export type ListLaunchQuerySchema = z.infer<typeof listLaunchQuerySchema>;
