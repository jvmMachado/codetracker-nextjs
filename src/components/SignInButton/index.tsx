import { signIn, useSession, signOut } from 'next-auth/client';
import { FaGithub } from 'react-icons/fa';
import { FiX } from 'react-icons/fi';

import styles from './styles.module.scss';

export function SignInButton() {
  const [session] = useSession();

  return session ? (
    <button className={styles.signInButton}>
      <FaGithub color='#04d361' />
      {session.user?.name}
      <FiX
        color='#737380'
        className={styles.closeIcon}
        onClick={() => signOut({ callbackUrl: 'http://localhost:3000/' })}
      />
    </button>
  ) : (
    <button
      className={styles.signInButton}
      onClick={() =>
        signIn('github', { callbackUrl: 'http://localhost:3000/' })
      }
    >
      <FaGithub color='#eba417' />
      Logar com GitHub
    </button>
  );
}
