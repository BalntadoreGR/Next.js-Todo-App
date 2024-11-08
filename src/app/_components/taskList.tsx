"use client";
import { useTaskStore } from '../../store/taskStore';
import { TaskItem } from './taskItem';
import styles from "./taskList.module.css";

const TaskList = () => {
  const tasks = useTaskStore((state) => state.tasks);

  return (
    <div className={styles.taskList}>
      {tasks.length === 0 ? (
        <p className={styles.noTasks}>You have no tasks.</p>
      ) : (
        tasks.map((task) => (
          <TaskItem key={task.id} task={task} />
        ))
      )}
    </div>
  );
};

export default TaskList;