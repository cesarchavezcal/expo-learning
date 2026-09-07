import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import {
  addMicroStep,
  completeTask,
  createTask,
  deleteTask,
  getDoneTasks,
  getLaterTasks,
  getNowTask,
  promoteToNow,
  toggleMicroStep,
} from '../task-service';

describe('ADHD Task Service (Spec Contract Verification)', () => {
  it('SCEN-001: promotes first created task to "now" automatically', () => {
    const initialTasks = createTask([], 'Write meeting notes');
    assert.equal(initialTasks.length, 1);
    assert.equal(initialTasks[0].status, 'now');
    assert.equal(initialTasks[0].title, 'Write meeting notes');
  });

  it('SCEN-002: sends subsequent created tasks to "later" queue', () => {
    let tasks = createTask([], 'Task 1');
    tasks = createTask(tasks, 'Task 2');

    const now = getNowTask(tasks);
    const later = getLaterTasks(tasks);

    assert.equal(now?.title, 'Task 1');
    assert.equal(later.length, 1);
    assert.equal(later[0].title, 'Task 2');
  });

  it('SCEN-003: completing "now" task advances the queue and promotes next task', () => {
    let tasks = createTask([], 'Task 1');
    tasks = createTask(tasks, 'Task 2');

    const task1 = getNowTask(tasks)!;
    tasks = completeTask(tasks, task1.id);

    const done = getDoneTasks(tasks);
    const newNow = getNowTask(tasks);

    assert.equal(done.length, 1);
    assert.equal(done[0].id, task1.id);
    assert.ok(done[0].completedAt !== undefined);
    assert.equal(newNow?.title, 'Task 2');
  });

  it('SCEN-004: manages micro-steps on active task', () => {
    let tasks = createTask([], 'Clean apartment');
    const task = getNowTask(tasks)!;

    tasks = addMicroStep(tasks, task.id, 'Pick up coffee mug');
    tasks = addMicroStep(tasks, task.id, 'Take out recycling');

    let current = getNowTask(tasks)!;
    assert.equal(current.microSteps.length, 2);
    assert.equal(current.microSteps[0].isCompleted, false);

    tasks = toggleMicroStep(tasks, task.id, current.microSteps[0].id);
    current = getNowTask(tasks)!;
    assert.equal(current.microSteps[0].isCompleted, true);
    assert.equal(current.microSteps[1].isCompleted, false);
    assert.equal(current.status, 'now');
  });

  it('allows manual promotion of any later task to "now"', () => {
    let tasks = createTask([], 'Task 1');
    tasks = createTask(tasks, 'Task 2');

    const task2 = tasks.find((t) => t.title === 'Task 2')!;
    tasks = promoteToNow(tasks, task2.id);

    assert.equal(getNowTask(tasks)?.id, task2.id);
    assert.equal(getLaterTasks(tasks)[0].title, 'Task 1');
  });
});
