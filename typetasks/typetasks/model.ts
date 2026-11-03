export type TaskStatus = 'todo' | 'in-progress' | 'done';

export interface Task {
    id: number;
    title: string;
    status: TaskStatus;
}

let nextId = 1;

export function addTask(tasks: Task[], title: string): Task[] {
    const newTask: Task = { id: nextId++, title: title, status: "todo" };
    return [...tasks, newTask];
}

export function completeTask(tasks: Task[], id: number): Task[] {
    return tasks.map(task => task.id === id ? { ...task, status: "done" } : task);
}

export function filterStatus(tasks: Task[], status: TaskStatus): Task[] {
    return tasks.filter(task => task.status === status);
}

export function deleteTask(tasks: Task[], id: number): Task[] {
    return tasks.filter(task => task.id !== id);
}