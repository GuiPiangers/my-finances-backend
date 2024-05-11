import { z } from "zod";

export const refreshTokenBodySchema = z.object({
  userId: z.string(),
  refreshTokenId: z.string(),
});

export type RefreshTokenSchema = z.infer<typeof refreshTokenBodySchema>;
