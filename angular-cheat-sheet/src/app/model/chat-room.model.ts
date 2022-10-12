export interface Topic {
  id?: number;
  title: string;
  author: string;
  userId: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface Message {
  id?: number;
  content: string;
  author: string;
  topicId: number;
  userId: number;
  createdAt?: string;
}

export const TAB_USER_VIEW = {
  ALL: 'ALL',
  CONNECTED: 'CND'
}