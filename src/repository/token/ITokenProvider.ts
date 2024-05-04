export type JwtPayload = {
  userId: string;
};

export interface ITokenProvider {
  create(userId: string): Promise<string>;
  verify(token: string): Promise<JwtPayload>;
}
