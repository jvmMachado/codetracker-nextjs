import { useSession } from 'next-auth/client';
import { SignInButton } from '../SignInButton';
import { useRouter } from 'next/router';
import { FiPlusSquare } from 'react-icons/fi';

import styles from './styles.module.scss';
import useModal from '../../hooks/useModal';

export function Header() {
  const router = useRouter();
  const [session] = useSession();
  const { toggleModal } = useModal();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        CodeTracker
        <nav>
          <a
            className={router.pathname === '/' ? styles.active : ''}
            onClick={() => {
              router.push('/');
            }}
          >
            Home
          </a>
          {session && (
            <a
              className={router.pathname === '/tasks' ? styles.active : ''}
              onClick={() => {
                router.push('/tasks');
              }}
            >
              Atividades
            </a>
          )}
        </nav>
        {router.pathname === '/tasks' && (
          <button
            className={styles.addTaskButton}
            type='button'
            onClick={toggleModal}
          >
            <div className={styles.text}>Nova Atividade</div>
            <div className={styles.icon}>
              <FiPlusSquare size={24} />
            </div>
          </button>
        )}
        <SignInButton />
      </div>
    </header>
  );
}
