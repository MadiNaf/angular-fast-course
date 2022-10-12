export interface ISignInRequest {
  username: string;
  password: string;
}

export interface IUserSession {
  id: number;
  accessToken: string;
}