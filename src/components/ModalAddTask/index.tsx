import { FiCheckSquare } from 'react-icons/fi';

import type { TTask } from '../../types';
import { useState, FormEvent } from 'react';
import useModal from '../../hooks/useModal';

import styles from './styles.module.scss';

interface ModalAddTaskProps {
  handleAddTask: (data: TTask) => void;
}

const ModalAddTask = (props: ModalAddTaskProps) => {
  const { modalOpen: isOpen, toggleModal } = useModal();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    const { handleAddTask } = props;

    event.preventDefault();

    const form = event.currentTarget;
    const formInputs = Array.from(form) as HTMLInputElement[];
    const inputs = formInputs.slice(0, -1);

    const dataAsJson = `{ ${inputs
      .map(({ name, value }) => `"${name}": "${value}"`)
      .join(',')} }`;
    const newData = JSON.parse(dataAsJson) as TTask;

    // RESETA TODOS CAMPOS
    form.reset();
    // DEIXA O ULTIMO STATUS SELECIONADO
    // formInputs.slice(0, -2).forEach((e) => (e.value = ''));

    handleAddTask(newData);
    toggleModal();
  }

  const [selected, setSelected] = useState<undefined | string>(undefined);

  return (
    <div className={styles.box} aria-hidden={isOpen}>
      <div className={styles.overlay} onClick={toggleModal} />
      <div className={styles.container}>
        <form onSubmit={handleSubmit}>
          <h1>Nova Atividade</h1>
          <div>
            <input name='title' placeholder='Tarefa' />
          </div>
          <div>
            <input name='description' placeholder='Descrição' />
          </div>
          <div>
            <input type='hidden' name='createdAt' defaultValue={Date.now()} />
          </div>
          <div>
            <select
              name='status'
              value={selected}
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

export default ModalAddTask;

// const [selected, setSelected] = useState(0);
// {['pendente', 'concluida', 'cancelada'].map((e, index) => {
//   return (
//       <Fragment key={ `${e} - ${index}` }>
//         <label htmlFor={e}>
//           {e.slice(0, 1).toUpperCase() + e.slice(1)}
//         </label>
//         <Input
//           type='radio'
//           name='status'
//           id={e}
//           value={e.toUpperCase()}
//           checked={index === selected}
//           onChange={() => setSelected(index)}
//         />
//       </Fragment>
//   );
// })}
