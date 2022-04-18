import {AppProps} from 'next/app';
import { Header } from '../components/Header';
import { SessionProvider as NextAuthProvider } from 'next-auth/react';

import '../styles/global.scss';

// se eu quiser que algo repita em alguma pagina coloque aqui
function MyApp({Component, pageProps}: AppProps) {
    return (
       <NextAuthProvider session={pageProps.session}>
        <Header />
        <Component {...pageProps} />
       </NextAuthProvider>
    )
}

export default MyApp