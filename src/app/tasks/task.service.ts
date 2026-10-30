import { Injectable, computed, effect, signal } from '@angular/core';
import { Task } from './task.model';

export const STORAGE_KEY = 'tarefas-poc';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private readonly _tasks = signal<Task[]>(this.load());

  readonly tasks = this._tasks.asReadonly();
  readonly pendingCount = computed(() => this._tasks().filter((t) => !t.done).length);

  constructor() {
    effect(() => localStorage.setItem(STORAGE_KEY, JSON.stringify(this._tasks())));
  }

  add(title: string, description = ''): void {
    const task: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      done: false,
      createdAt: new Date().toISOString(),
    };
    this._tasks.update((tasks) => [task, ...tasks]);
  }

  toggle(id: string): void {
    this._tasks.update((tasks) => tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));
  }

  remove(id: string): void {
    this._tasks.update((tasks) => tasks.filter((t) => t.id !== id));
  }

  private load(): Task[] {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]') as Task[];
    } catch {
      return [];
    }
  }
}
