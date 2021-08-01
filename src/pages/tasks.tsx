import React, { useState } from 'react';
import Head from 'next/head';
import { uuid } from 'uuidv4';

import styles from './tasks.module.scss';
import ModalAddTask from '../components/ModalAddTask';
import ModalEditTask from '../components/ModalEditTask';
import type { TTask } from '../types';
import Task from '../components/Task';
import Cookies from 'js-cookie';
import useModal from '../hooks/useModal';
import { GetServerSideProps } from 'next';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';

interface TasksProps {
  initialTasks: string;
}

export default function Tasks({ initialTasks }: TasksProps) {
  const { toggleEditModal } = useModal();
  const router = useRouter();
  const [session] = useSession();

  const [tasks, setTasks] = useState<TTask[]>([]);
  const [editingTask, setEditingTask] = useState<TTask>({} as TTask);
  const [statusSelected, setStatusSelected] = useState<string | null>(null);

  

  useEffect(() => {
    if(!session) {
      router.replace('/');
    }
    setTasks(JSON.parse(initialTasks));
  }, [initialTasks, session, router]);

  const stringfy = (obj: any) =>
    JSON.stringify(obj).replace(/,(?!["{}[\]])/g, '');

  const handleAddTask = async (task: TTask) => {
    const newTask = { ...task, id: uuid() };
    const newTasks = tasks.concat(newTask);

    setTasks(newTasks);
    Cookies.set('tasks', stringfy(newTasks));
  };

  const handleUpdateTask = async (task: TTask) => {
    const updatedTasks = tasks.map((oldTask) =>
      oldTask.id !== task.id ? oldTask : task,
    );

    setEditingTask({} as TTask);

    setTasks(updatedTasks);
    Cookies.set('tasks', stringfy(updatedTasks));
  };

  const handleDeleteTask = async (id: string) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);

    setTasks(filteredTasks);
    Cookies.set('tasks', stringfy(filteredTasks));
  };

  const handleEditTask = (task: TTask) => {
    setEditingTask(task);
    toggleEditModal();
  };

  return (
    <>
      <Head>
        <title>Home | codetracker</title>
      </Head>

      <ModalAddTask handleAddTask={handleAddTask} />

      <ModalEditTask
        editingTask={editingTask}
        handleUpdateTask={handleUpdateTask}
      />

      <div className={styles.FiltersContainer}>
        <select
          onChange={({ target: { value } }) =>
            setStatusSelected(value.toUpperCase())
          }
        >
          {['sem filtro', 'pendente', 'concluida', 'cancelada'].map(
            (e, index) => {
              return (
                <option key={`${e} - ${index}`} value={index === 0 ? '' : e}>
                  {e.slice(0, 1).toUpperCase() + e.slice(1)}
                </option>
              );
            },
          )}
        </select>
      </div>

      <div className={styles.TasksContainer}>
        {Array.from(tasks)
          .sort((a, b) => a.createdAt - b.createdAt)
          .filter((task) => {
            if (!statusSelected) return true;

            return task.status.toLocaleUpperCase() === statusSelected;
          })
          .map((task) => (
            <Task
              key={task.id}
              task={task}
              handleEditTask={() => {
                handleEditTask(task);
              }}
              handleDelete={() => {
                handleDeleteTask(task.id);
              }}
            />
          ))}
      </div>
    </>
  );
}

export { getServerSideProps };

const getServerSideProps: GetServerSideProps<TasksProps> = async (ctx) => {
  const { tasks: initialTasks } = ctx.req.cookies as any;

  if (!initialTasks) {
    return {
      props: {
        initialTasks: '[]',
      },
    };
  }

  return {
    props: {
      initialTasks: initialTasks.replace(/(%..)/g, ' ').replace(/\s\s/g, ','),
    },
  };
};