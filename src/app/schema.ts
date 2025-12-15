export interface TasksInterface {
  id: number;
  description: string;
  title: string;
  isCompleted: boolean;
}

export interface TokenType {
  token: string;
}

export interface PayloadType {
  action?: string;
  id?: number;
  title: string;
  description: string;
}
