import { z } from "zod";
import { createLaunchBodySchema } from "./createLaunch.schema";

export const updateLaunchParamsSchema = z.object({
  id: z.string(),
});
export const updateLaunchBodySchema = createLaunchBodySchema.partial();

export type UpdateLaunchParamsSchema = z.infer<typeof updateLaunchParamsSchema>;
