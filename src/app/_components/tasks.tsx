"use client";
import { useCallback, useEffect } from "react";
import styles from "./tasks.module.css";
import { api } from "~/trpc/react";
import { useTaskStore } from "~/store/taskStore";
import TaskList from "./taskList";
import { AddTask } from "./addTask";

export function Tasks() {
  const [tasks] = api.task.getTasks.useSuspenseQuery();
  console.log(tasks);

  const setTasks = useTaskStore((state) => state.setTasks);

  const updateTasks = useCallback(() => {
    if (tasks) {
      setTasks(tasks);
    }
  }, [tasks, setTasks]);

  useEffect(() => {
    updateTasks();
  }, [updateTasks]);

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
