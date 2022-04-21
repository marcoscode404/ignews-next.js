import { useSession, signIn } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

interface SubscribeButtonProps {
    priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
    //primeiro verifique se o usuario está logado para continuar
    const session = useSession();
    
    async function handleSubscribe() {
        // se não existir um sessão, redirecione ele para a autenticação
        if(!session) {
            signIn('github')
            return;
        }

        // se ele está logado
        try {
            const response = await api.post('/subscribe')

            const { sessionId } = response.data;

            const stripe = await getStripeJs()

            await stripe.redirectToCheckout({ sessionId: sessionId })
        } catch (err) {
            alert(err.message);
        }


    }
   
   
    return (
        <button 
            type='button'
            className={styles.subscribeButton}
            onClick={handleSubscribe}
        >
                Subscribe now
        </button>
    );
}