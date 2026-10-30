import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { STORAGE_KEY } from './tasks/task.service';

describe('App', () => {
  beforeEach(async () => {
    localStorage.removeItem(STORAGE_KEY);
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should add a task and list it', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const el = fixture.nativeElement as HTMLElement;

    const input = el.querySelector<HTMLInputElement>('[data-cy=task-title-input]')!;
    input.value = 'Estudar Angular';
    input.dispatchEvent(new Event('input'));
    el.querySelector<HTMLFormElement>('[data-cy=task-form]')!.dispatchEvent(new Event('submit'));
    await fixture.whenStable();

    expect(el.querySelectorAll('[data-cy=task-item]').length).toBe(1);
    expect(el.querySelector('[data-cy=task-title]')?.textContent).toContain('Estudar Angular');
  });
});
