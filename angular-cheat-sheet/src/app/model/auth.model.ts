export interface SignInRequest {
  username: string;
  password: string;
}

export interface AuthUserSession {
  id: number;
  accessToken: string;
}