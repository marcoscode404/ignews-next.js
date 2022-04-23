import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client'

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

export default function Posts() {
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    <a href='#'>
                        <time>23 de Abril de 2022</time>
                        <strong>Mapas com React usando Leafletxxxxxxxxx</strong>
                        <p>Vamos mostrar como adicionar Dark Mode no Blog de maneira rápida e fácil, sem depender do JavaScript, usando apenas o CSS.

                            Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.

                            O usuário quer ler um conteúdo com tema escuro, então a imagem do conteúdo precisa se adequar e ter menos brilho.

                            🖥️ Navegadores modernos
                        </p>
                    </a>

                    <a href='#'>
                        <time>23 de Abril de 2022</time>
                        <strong>Mapas com React usando Leafletxxxxxxxxx</strong>
                        <p>Vamos mostrar como adicionar Dark Mode no Blog de maneira rápida e fácil, sem depender do JavaScript, usando apenas o CSS.

                            Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.

                            O usuário quer ler um conteúdo com tema escuro, então a imagem do conteúdo precisa se adequar e ter menos brilho.

                            🖥️ Navegadores modernos
                        </p>
                    </a>

                    <a href='#'>
                        <time>23 de Abril de 2022</time>
                        <strong>Mapas com React usando Leafletxxxxxxxxx</strong>
                        <p>Vamos mostrar como adicionar Dark Mode no Blog de maneira rápida e fácil, sem depender do JavaScript, usando apenas o CSS.

                            Vou trazer um conceito — uma ideia — que vai além de mudar o background do fundo da tela e as cores dos textos, que é o padrão. Vamos escurecer um pouco as imagens também.

                            O usuário quer ler um conteúdo com tema escuro, então a imagem do conteúdo precisa se adequar e ter menos brilho.

                            🖥️ Navegadores modernos
                        </p>
                    </a>
                </div>
            </main>
        </>
    )
}


export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response =  await prismic.query([
        Prismic.predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    })

    console.log(response)

    return {
        props: {}
    }
}