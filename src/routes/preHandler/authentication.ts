import { handleVerifyToken } from "../../core/authentication/controllers/verifyToken";

export const authenticationPreHandler = {
  preHandler: handleVerifyToken,
};
