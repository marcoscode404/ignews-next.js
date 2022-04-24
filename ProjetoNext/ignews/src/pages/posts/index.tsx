import { GetStaticProps } from 'next';
import Head from 'next/head';
import Prismic from '@prismicio/client';
import { RichText } from 'prismic-dom';

import { getPrismicClient } from '../../services/prismic';
import styles from './styles.module.scss';

type Posts = {
    slug: string;
    title: string;
    excerpt: string;
    updatedAt: string;
}
interface PostsProps {
    posts: Posts[]
}

export default function Posts( { posts }: PostsProps ) {
    return(
        <>
            <Head>
                <title>Posts | Ignews</title>
            </Head>

            <main className={styles.container}>
                <div className={styles.posts}>
                    { posts.map(post => (
                        <a key={post.slug} href='#'>
                            <time>{post.updatedAt}</time>
                            <strong>{post.title}</strong>
                            <p>{post.excerpt}</p>
                        </a>
                    )) }
                    

            

                </div>
            </main>
        </>
    )
}

// chamada pra API
// OBS: ao puxar dados de data, ou preço. Faça a alteração ao chamar a AP
// Pois assim ela só vai ser alterada apenas 1 vez
// não formatando no layout 

export const getStaticProps: GetStaticProps = async () => {
    const prismic = getPrismicClient()

    const response = await prismic.query([
        Prismic.Predicates.at('document.type', 'publication')
    ], {
        fetch: ['publication.title', 'publication.content'],
        pageSize: 100,
    });

    const posts = response.results.map(post => {
        return {
            slug: post.uid,
            title: RichText.asText(post.data.title),
            excerpt: post.data.content.find(content => content.type === 'paragraph')?.text ?? '',
            updatedAt: new Date(post.last_publication_date).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
            })
        };
    })

    return {
        props: {
            posts
        }
    }
}