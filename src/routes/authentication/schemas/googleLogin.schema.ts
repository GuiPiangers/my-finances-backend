import { z } from "zod";

export const googleLoginBodySchema = z.object({
  token: z.string(),
});

export type GoogleLoginSchema = z.infer<typeof googleLoginBodySchema>;
