"use client";
import { useEffect } from "react";
import styles from "./tasks.module.css";
import { api } from "~/trpc/react";
import { useTaskStore } from "~/store/taskStore";
import TaskList from "./taskList";
import { AddTask } from "./addTask";

export function Tasks() {
  const [tasks] = api.task.getTasks.useSuspenseQuery();

  const setTasks = useTaskStore((state) => state.setTasks);

  useEffect(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [setTasks, tasks]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        To-Do List
      </h1>   
      <AddTask />
      <TaskList />
    </div>
  );
}
