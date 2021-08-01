import { FiCheckSquare } from 'react-icons/fi';

import styles from './styles.module.scss';

import type { TTask } from '../../types';
import { useState, FormEvent } from 'react';
import useModal from '../../hooks/useModal';

interface ModalEditTaskProps {
  editingTask: TTask;
  handleUpdateTask: (data: TTask) => void;
}

const ModalEditTask = (props: ModalEditTaskProps) => {
  const { editModalOpen: isOpen, toggleEditModal } = useModal();

  const { editingTask } = props;
  const [selected, setSelected] = useState<string | undefined>(undefined);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const { handleUpdateTask } = props;

    event.preventDefault();

    const form = event.currentTarget;
    const formInputs = Array.from(form) as HTMLInputElement[];
    const inputs = formInputs.slice(0, -1);

    const dataAsJson = `{ ${inputs
      .map(({ name, value }) => `"${name}": "${value}"`)
      .join(',')} }`;
    const newData = JSON.parse(dataAsJson) as TTask;

    setSelected(undefined);
    form.reset();

    handleUpdateTask(newData);
    toggleEditModal();
  }

  return (
    <div className={styles.box} aria-hidden={isOpen}>
      <div className={styles.overlay} onClick={toggleEditModal} />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Editar Prato</h1>
          <div>
            <input type='hidden' name='id' defaultValue={editingTask.id} />
          </div>
          <div>
            <input
              type='hidden'
              name='createdAt'
              defaultValue={editingTask.createdAt}
            />
          </div>

          <div>
            <input
              name='title'
              placeholder='Tarefa'
              defaultValue={editingTask.title}
            />
          </div>
          <div>
            <input
              name='description'
              placeholder='Descrição'
              defaultValue={editingTask.description}
            />
          </div>
          <div>
            <select
              name='status'
              value={selected || editingTask.status}
              onChange={({ target: { value } }) => setSelected(value)}
            >
              {['pendente', 'concluida', 'cancelada'].map((e, index) => {
                return (
                  <option key={`${e} - ${index}`} value={e}>
                    {e.slice(0, 1).toUpperCase() + e.slice(1)}
                  </option>
                );
              })}
            </select>
          </div>

          <div>
            <button
              type='submit'
              data-testid='add-food-button'
              className={styles.button}
            >
              <p className={styles.text}>Adicionar Atividade</p>
              <div className={styles.icon}>
                <FiCheckSquare size={24} />
              </div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalEditTask;
