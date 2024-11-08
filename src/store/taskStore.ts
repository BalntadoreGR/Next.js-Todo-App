import { create } from 'zustand';

type Task = {
  id: number;
  title: string;
  description: string;
  status: string;
};

type TaskStore = {
  tasks: Task[];
  addTask: (task: Task) => void;
  deleteTask: (id: number) => void;
  toggleTask: (id: number) => void;
  setTasks: (tasks: Task[]) => void;
};

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],
  addTask: (task) => set((state) => ({ tasks: [...state.tasks, task] })),
  deleteTask: (id) => set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) })),
  toggleTask: (id) => set((state) => ({
    tasks: state.tasks.map((task) =>
      task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
    ),
  })),
  setTasks: (tasks) => set(() => ({ tasks })),
}));
