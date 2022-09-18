export interface UserSession {
  username: string;
  isConnected: boolean;
}

export const TAB_USER_VIEW = {
  ALL: 'ALL',
  CONNECTED: 'CND'
}