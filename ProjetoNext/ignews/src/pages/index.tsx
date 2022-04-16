import { GetStaticProps } from 'next';

import Head from 'next/head';

import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

import styles from './home.module.scss';


// criando a tipagem com o typeScript
interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}


export default function Home({ product }) {
    return (
      <>
        <Head>
            <title>ig.news</title>
            {/* titulo de forma dinamica em cada pagina */}
        </Head>

            <main className={styles.contentContainer}>
              <section className={styles.hero}>
                <span>👏Hey, welcome</span>
                <h1>News about the <span>React</span> world.</h1>
                <p>
                  Get acess to all the publications <br />
                    <span>for {product.amount} month</span>
                </p>
                <SubscribeButton priceId={product.priceId} />
              </section>

              <img src="/images/avatar.svg" alt="Girl coding" />
            </main>


      
      </>
    )
}


export const getStaticProps: GetStaticProps  = async () => {
  const price = await stripe.prices.retrieve('price_1KohLZJA4YObdWpiKHnb9D16')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };
  
  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // min, segundos, 24 para um dia
  }
}