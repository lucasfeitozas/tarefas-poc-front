import { Component, computed, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TaskService } from './tasks/task.service';
import { TaskFilter } from './tasks/task.model';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly taskService = inject(TaskService);

  protected readonly form = new FormGroup({
    title: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.maxLength(80)] }),
    description: new FormControl('', { nonNullable: true, validators: [Validators.maxLength(280)] }),
  });

  protected readonly submitted = signal(false);
  protected readonly filter = signal<TaskFilter>('all');
  protected readonly filters: { value: TaskFilter; label: string }[] = [
    { value: 'all', label: 'Todas' },
    { value: 'pending', label: 'Pendentes' },
    { value: 'done', label: 'Concluídas' },
  ];

  protected readonly visibleTasks = computed(() => {
    const tasks = this.taskService.tasks();
    switch (this.filter()) {
      case 'pending':
        return tasks.filter((t) => !t.done);
      case 'done':
        return tasks.filter((t) => t.done);
      default:
        return tasks;
    }
  });

  protected save(): void {
    this.submitted.set(true);
    const { title, description } = this.form.getRawValue();
    if (this.form.invalid || !title.trim()) {
      return;
    }
    this.taskService.add(title, description);
    this.form.reset();
    this.submitted.set(false);
  }
}
