export interface Task {
  id: string;
  title: string;
  description: string;
  done: boolean;
  createdAt: string;
}

export type TaskFilter = 'all' | 'pending' | 'done';
