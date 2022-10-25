export interface User {
  firstname: string,
  lastname: string,
  username: string,
  password: string,
  id?: number,
  token?: string,
}

export interface UserSession {
  username: string;
  isConnected: boolean;
}