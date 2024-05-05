export type JwtPayload = {
  userId: string;
};

export interface ITokenProvider {
  create(userId: string): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
  invalidToken(token: string): Promise<void>;
  invalidUser(userId: string): Promise<void>;
}
