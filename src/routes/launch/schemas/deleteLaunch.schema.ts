import { z } from "zod";

export const deleteLaunchBodySchema = z.object({
  id: z.string(),
});

export type DeleteLaunchSchema = z.infer<typeof deleteLaunchBodySchema>;
