import { AppProps } from 'next/app';
import { useState } from 'react';
import { Header } from '../components/Header';
import { ModalContextProvider } from '../contexts/ModalContext';
import useModal from '../hooks/useModal';
import { Provider as NextAuthProvider } from 'next-auth/client';

import '../styles/global.scss';

function MyApp({ Component, pageProps }: AppProps) {
  const ProviderLoader = ({ children }: any) => (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );

  return (
    <ModalContextProvider>
      <NextAuthProvider session={pageProps.session}>
        <ProviderLoader />
      </NextAuthProvider>
    </ModalContextProvider>
  );
}

export default MyApp;
