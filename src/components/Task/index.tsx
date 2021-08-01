import { useState } from 'react';
import { FiEdit3, FiTrash } from 'react-icons/fi';

import { Container } from './styles';
// import api from '../../services/api';
import type { TTask } from '../../types';

interface TaskProps {
  task: TTask;
  handleEditTask: (data: TTask) => void;
  handleDelete: (taskId: string) => void;
}

const Task = (props: TaskProps) => {
  const setEditingTask = () => {
    const { task, handleEditTask } = props;

    handleEditTask(task);
  };

  const { task, handleDelete } = props;

  return (
    <Container>
      <header></header>
      <section className='body'>
        <h2>{task.title}</h2>
        <p>{task.description}</p>
      </section>
      <section className='footer'>
        <div className='icon-container'>
          <button
            type='button'
            className='icon'
            onClick={setEditingTask}
            data-testid={`edit-task-${task.id}`}
          >
            <FiEdit3 size={20} />
          </button>

          <button
            type='button'
            className='icon'
            onClick={() => handleDelete(task.id)}
            data-testid={`remove-task-${task.id}`}
          >
            <FiTrash size={20} />
          </button>
        </div>

        {/* ERRO DE DIFERENÇA ENTRE SERVIDOR E CLIENT */}
        <div className='date-container'>
          {new Date(Number(task.createdAt) || 0)
            .toLocaleDateString('pt-br')
            .replace(/\//g, '-')}
        </div>

        <div className='status-container'>
          {task.status && (
            <p>
              {task.status.slice(0, 1).toUpperCase() + task.status.slice(1)}
            </p>
          )}
        </div>
      </section>
    </Container>
  );
};

export default Task;
