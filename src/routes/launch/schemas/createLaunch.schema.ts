import { z } from "zod";

export const createLaunchBodySchema = z.object({
  date: z.string(),
  description: z.string({ message: "Description is required" }),
  type: z.enum(["revenue", "expenditure"]),
  status: z.enum(["payed", "payable"]),
  category: z.string().optional(),
  value: z.number(),
});

export type CreateLaunchSchema = z.infer<typeof createLaunchBodySchema>;
