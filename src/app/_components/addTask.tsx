"use client";
import { useState } from 'react';
import { useTaskStore } from '../../store/taskStore';
import { api } from '~/trpc/react';
import { Task } from '~/types/types';
import styles from './addTask.module.css'


export const AddTask = () => {
    const addTask = useTaskStore((state) => state.addTask);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const utils = api.useUtils();

    const createTask = api.task.addTask.useMutation({
        onSuccess: async (data: Task) => {
        useTaskStore.getState().addTask(data);
          
          setTitle("");
          setDescription("");
          await utils.task.invalidate();
        },
      });    

      const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
          // Set loading state when the form is submitted
        createTask.mutate({ title, description });
      }
  
    return (
      <div className={styles.addTaskContainer}>
        <h1 style={{ fontSize: '18px', marginBottom: '8px' }}>Add new task :</h1>
        <form onSubmit={handleSubmit} className={styles.form}>          
          <input
            type="text"
            required
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={styles.inputField}
          />
          <input
            required
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.inputField}
          />
          <button type="submit" className={styles.submitButton}>
            +
          </button>
        </form>
      </div>
    );
  };