// src/components/TaskItem.tsx
import { Task } from './../../types/types';
import { useTaskStore } from './../../store/taskStore';
import { api } from '~/trpc/react';
import styles from "./taskItem.module.css";
type TaskItemProps = {
  task: Task;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const toggleStore = useTaskStore((state) => state.toggleTask);
  const deleteStore = useTaskStore((state) => state.deleteTask);

  const utils = api.useUtils();

  const toggleTask = api.task.toggleTask.useMutation({
    onSuccess: async (data: Task) => {
        useTaskStore.getState().toggleTask(data.id);
      await utils.task.invalidate(); // Refresh tasks after toggling
    },
  });

  const deleteTask = api.task.deleteTask.useMutation({
    onSuccess: async (data: Task) => {
        useTaskStore.getState().deleteTask(data.id)
      await utils.task.invalidate(); // Refresh tasks after deletion
    },
  });

  return (
    <div className={styles.taskItem}>
      <input
        type="checkbox"
        checked={task.status === 'completed'}
        onChange={() => toggleTask.mutate({ id: task.id })}
        style={{ marginRight: '10px' }}
      />
      <div className={task.status === "completed" ? styles.completed : styles.pending}>
        <strong>{task.title}</strong>
        <p style={{ margin: '4px 0', fontSize: '14px' }}>{task.description}</p>
      </div>
      <button onClick={() => deleteTask.mutate({ id: task.id })} className={styles.deleteButton}>
        X
      </button>
    </div>
  );
};
