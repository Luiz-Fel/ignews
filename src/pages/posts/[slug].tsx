import styles from './post.module.scss'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import { getPrismicClient } from '../../services/prismic'
import { RichText } from 'prismic-dom'
import Head from 'next/head'

interface PostProps {
    post : {
        content: string
        slug: string,
        title: string,
        excerpt: string,
        updatedAt: string
    }
}

export default function Post({post} : PostProps) {
    return(
        <>
        <Head>
            <title >`${post.title} | Ignews`</title>
        </Head>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1></h1>
                <time>{post.excerpt}</time>
                <div dangerouslySetInnerHTML={{__html: post.content}} className={styles.postContent} />
            </article>
        </main>
        </>
    )
}

export const getServerSideProps : GetServerSideProps = async ({req, params}) => {

    const session =  await getSession({ req })

    console.log(session)

    const { slug } = params

    if (!session?.activeSubscription) {

        return {
            redirect: {
                destination: '/',
                permanent: false,
            }
        }
    }


    const prismic = getPrismicClient(req)

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric', 
        })
    }

    return {
        props: {
            post,
        }
    }
}