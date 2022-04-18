import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'

// importando dentro do next a funcionalidade de autentication
// obs: ao importar o next-auth/client dá erro
import { signIn, signOut, useSession }  from 'next-auth/react'

import styles from './styles.module.scss';

export function SignInButton() {
    // verifica se o user está logado
    const {data: session} = useSession();




    return session ? (
        <button 
            type="button"
            className={styles.signInButton}
            // dispara função para deslogar
            onClick={()=>signOut()}
        >
                <FaGithub color="#04d361"/>
                {session.user.name}
                <FiX color='#737380' className={styles.closeIcon} />
        </button>
    ) : (
        <button 
             type="button"
             className={styles.signInButton}
             onClick={() => signIn('github')}
        >
            <FaGithub color="#eba417"/>
            Sign in with github
        </button>
    );
}