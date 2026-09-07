import AsyncStorage from '@react-native-async-storage/async-storage';
import { useCallback, useEffect, useState } from 'react';

import * as taskService from '@/services/task-service';
import { Task } from '@/types/task';

const TASKS_STORAGE_KEY = '@adhd_focus_tasks_v1';

const INITIAL_DEMO_TASKS: Task[] = [
  {
    id: 'demo-1',
    title: 'Review Scandinavian typography in reader',
    status: 'now',
    createdAt: Date.now() - 3600000,
    microSteps: [
      { id: 'ms-1', taskId: 'demo-1', title: 'Open iPhone 17 simulator', isCompleted: true, order: 1 },
      { id: 'ms-2', taskId: 'demo-1', title: 'Check Chapter I letter spacing', isCompleted: false, order: 2 },
    ],
  },
  {
    id: 'demo-2',
    title: 'Pick up physical book for evening read',
    status: 'later',
    createdAt: Date.now() - 7200000,
    microSteps: [],
  },
];

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(TASKS_STORAGE_KEY)
      .then((stored) => {
        if (stored) {
          try {
            setTasks(JSON.parse(stored));
          } catch {
            setTasks(INITIAL_DEMO_TASKS);
          }
        } else {
          setTasks(INITIAL_DEMO_TASKS);
          AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_TASKS)).catch(() => {});
        }
      })
      .finally(() => setIsLoaded(true));
  }, []);

  const persist = useCallback((nextTasks: Task[]) => {
    setTasks(nextTasks);
    AsyncStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(nextTasks)).catch(() => {});
  }, []);

  const addTask = useCallback(
    (title: string) => {
      const next = taskService.createTask(tasks, title);
      persist(next);
    },
    [tasks, persist]
  );

  const completeTask = useCallback(
    (taskId: string) => {
      const next = taskService.completeTask(tasks, taskId);
      persist(next);
    },
    [tasks, persist]
  );

  const promoteToNow = useCallback(
    (taskId: string) => {
      const next = taskService.promoteToNow(tasks, taskId);
      persist(next);
    },
    [tasks, persist]
  );

  const addMicroStep = useCallback(
    (taskId: string, title: string) => {
      const next = taskService.addMicroStep(tasks, taskId, title);
      persist(next);
    },
    [tasks, persist]
  );

  const toggleMicroStep = useCallback(
    (taskId: string, stepId: string) => {
      const next = taskService.toggleMicroStep(tasks, taskId, stepId);
      persist(next);
    },
    [tasks, persist]
  );

  const deleteTask = useCallback(
    (taskId: string) => {
      const next = taskService.deleteTask(tasks, taskId);
      persist(next);
    },
    [tasks, persist]
  );

  const nowTask = taskService.getNowTask(tasks);
  const laterTasks = taskService.getLaterTasks(tasks);
  const doneTasks = taskService.getDoneTasks(tasks);

  return {
    tasks,
    nowTask,
    laterTasks,
    doneTasks,
    isLoaded,
    addTask,
    completeTask,
    promoteToNow,
    addMicroStep,
    toggleMicroStep,
    deleteTask,
  };
}
