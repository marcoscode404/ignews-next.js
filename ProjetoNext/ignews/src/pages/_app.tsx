import {AppProps} from 'next/app';
import { Header } from '../components/Header';

import '../styles/global.scss';

// se eu quiser que algo repita em alguma pagina coloque aqui
function MyApp({Component, pageProps}: AppProps) {
    return (
       <>
        <Header />
        <Component {...pageProps} />
       </>
    )
}

export default MyApp