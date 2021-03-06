import styles from '../post.module.scss'
import {  GetStaticProps } from 'next'
import { getPrismicClient } from '../../../services/prismic'
import { RichText } from 'prismic-dom'
import Link from 'next/link'
import Head from 'next/head'
import { useSession } from 'next-auth/client'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

interface PostPreviewProps {
    post : {
        content: string
        slug: string,
        title: string,
        excerpt: string,
        updatedAt: string
    }
} 


export default function PostPreview({post} : PostPreviewProps) {

    const [session] = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session?.activeSubscription) {
            router.push(`/posts/${post.slug}`)
        }
    }, [session])

    return(
        <>
        <Head>
            <title >`${post.title} | Ignews`</title>
        </Head>
        <main className={styles.container}>
            <article className={styles.post}>
                <h1>{post.title}</h1>
                <time>{post.excerpt}</time>
                <div 
                dangerouslySetInnerHTML={{__html: post.content}} 
                className= {`${styles.postContent} ${styles.previewContent} `}
                />
                <div className={styles.continueReading}>
                    Wanna continue reading ?
                    <Link href="/">
                        <a> Subscribe now 🤗</a>
                    </Link>
                </div>
            </article>
        </main>
        </>
    )
}

export const getStaticPaths = () => {
    return {
        paths: [],
        fallback: 'blocking'
    }
}

export const getStaticProps : GetStaticProps = async ({ params }) => {



    const { slug } = params



    const prismic = getPrismicClient()

    const response = await prismic.getByUID('post', String(slug), {})

    const post = {
        slug,
        title: RichText.asText(response.data.title),
        content: RichText.asHtml(response.data.content.splice(0, 15)),
        updatedAt: new Date(response.last_publication_date).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'long',
            year: 'numeric', 
        })
    }

    return {
        props: {
            post,
        },

        revalidate: 60 * 30 // 30 minutes
    }
}