import { MicroStep, Task } from '../types/task';

export function createTask(existingTasks: Task[], title: string): Task[] {
  const trimmed = title.trim();
  if (!trimmed) return existingTasks;

  const hasNowTask = existingTasks.some((t) => t.status === 'now');
  const newTask: Task = {
    id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    title: trimmed,
    status: hasNowTask ? 'later' : 'now',
    createdAt: Date.now(),
    microSteps: [],
  };

  return [newTask, ...existingTasks];
}

export function completeTask(tasks: Task[], taskId: string): Task[] {
  const target = tasks.find((t) => t.id === taskId);
  if (!target) return tasks;

  const updatedTasks = tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        status: 'done' as const,
        completedAt: Date.now(),
      };
    }
    return t;
  });

  // If the completed task was the "now" task, promote the next "later" task to "now"
  if (target.status === 'now') {
    const nextPending = updatedTasks.find((t) => t.status === 'later');
    if (nextPending) {
      return updatedTasks.map((t) => (t.id === nextPending.id ? { ...t, status: 'now' as const } : t));
    }
  }

  return updatedTasks;
}

export function promoteToNow(tasks: Task[], taskId: string): Task[] {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return { ...t, status: 'now' as const };
    }
    if (t.status === 'now') {
      return { ...t, status: 'later' as const };
    }
    return t;
  });
}

export function addMicroStep(tasks: Task[], taskId: string, stepTitle: string): Task[] {
  const trimmed = stepTitle.trim();
  if (!trimmed) return tasks;

  return tasks.map((t) => {
    if (t.id === taskId) {
      const newStep: MicroStep = {
        id: `step-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        taskId,
        title: trimmed,
        isCompleted: false,
        order: t.microSteps.length + 1,
      };
      return {
        ...t,
        microSteps: [...t.microSteps, newStep],
      };
    }
    return t;
  });
}

export function toggleMicroStep(tasks: Task[], taskId: string, stepId: string): Task[] {
  return tasks.map((t) => {
    if (t.id === taskId) {
      return {
        ...t,
        microSteps: t.microSteps.map((step) =>
          step.id === stepId ? { ...step, isCompleted: !step.isCompleted } : step
        ),
      };
    }
    return t;
  });
}

export function deleteTask(tasks: Task[], taskId: string): Task[] {
  const remaining = tasks.filter((t) => t.id !== taskId);
  const hasNow = remaining.some((t) => t.status === 'now');
  if (!hasNow) {
    const next = remaining.find((t) => t.status === 'later');
    if (next) {
      return remaining.map((t) => (t.id === next.id ? { ...t, status: 'now' as const } : t));
    }
  }
  return remaining;
}

export function getNowTask(tasks: Task[]): Task | undefined {
  return tasks.find((t) => t.status === 'now');
}

export function getLaterTasks(tasks: Task[]): Task[] {
  return tasks.filter((t) => t.status === 'later');
}

export function getDoneTasks(tasks: Task[]): Task[] {
  return tasks.filter((t) => t.status === 'done');
}
