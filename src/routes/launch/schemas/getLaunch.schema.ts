import { z } from "zod";

export const getLaunchParamsSchema = z.object({
  id: z.string(),
});

export type GetLaunchSchema = z.infer<typeof getLaunchParamsSchema>;
