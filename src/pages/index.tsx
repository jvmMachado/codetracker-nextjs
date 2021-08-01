import React from 'react';
import Head from 'next/head';
import Image from 'next/image';

import avatarImg from '../../public/images/avatar.svg';

import styles from './home.module.scss';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home | codetracker</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👨‍💻 Fala, Dev! 👩‍💻</span>
          <h1>Organize suas tarefas de <span>desenvolvimento</span>.</h1>
          <p>
            E nunca mais perca aquele prazo. <br/>
            <span>É grátis!</span>
          </p>
        </section>
        <Image src={avatarImg} alt="girl coding" />
      </main>
    </>
  )
}