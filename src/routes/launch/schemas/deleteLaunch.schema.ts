import { z } from "zod";

export const deleteLaunchParamsSchema = z.object({
  id: z.string(),
});

export type DeleteLaunchSchema = z.infer<typeof deleteLaunchParamsSchema>;
