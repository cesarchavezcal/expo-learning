export type MicroStep = {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  order: number;
};

export type TaskStatus = 'now' | 'later' | 'done';

export type Task = {
  id: string;
  title: string;
  status: TaskStatus;
  createdAt: number;
  completedAt?: number;
  microSteps: MicroStep[];
  estimatedMinutes?: number;
};
