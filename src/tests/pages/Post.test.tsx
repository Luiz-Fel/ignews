import {render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { getSession } from 'next-auth/client'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getPrismicClient } from '../../services/prismic'

jest.mock('next-auth/client')
jest.mock('../../services/prismic')


const post =  {
        slug: 'my-new-post',
        title: 'My New Post',
        content: '<p>Post excerpt</p>',
        updatedAt: 'March, 10'
    }



 describe('Posts Page', () => {
    it('renders correctly', () => {
         render(<Post post={post}  />)

         expect(screen.getByText("My New Post")).toBeInTheDocument()
         expect(screen.getByText("Post excerpt")).toBeInTheDocument()

    })

    /// ------------------------------------------------------------------------------

    it('redirects user if no subscription is found', async () => {
        const getSessionMocked = mocked(getSession)

        getSessionMocked.mockResolvedValueOnce(null)
        

        const response = await getServerSideProps({params: { slug: 'my-new-post' }} as any)

        expect(response).toEqual(
            expect.objectContaining({
                redirect: expect.objectContaining(
                    {
                        destination: '/'
                }
                )
            })
        )
    })

     
     
    it('renders inital data', async () => {
        const getPrismicClientMocked = mocked(getPrismicClient)
        const getSessionMocked = mocked(getSession)

        getPrismicClientMocked.mockReturnValueOnce({
            getByUID: jest.fn().mockResolvedValueOnce({
                data: {
                    title: [{
                        type: 'heading',
                        text: 'My New Post'
                    },],
                    content: [{
                        type: 'paragraph',
                        text: 'Post excerpt'
                    }],
                },
                last_publication_date: '04-01-2021'
            })
        } as any)

        getSessionMocked.mockResolvedValueOnce({
            activeSubscription: 'fake-active-subscription'
        } as any)

        const response = await getServerSideProps({params: { slug: 'my-new-post' }} as any)

        expect(response).toEqual(
            expect.objectContaining({
                props: {
                    post: {
                        slug: 'my-new-post',
                        title: 'My New Post',
                        content: '<p>Post excerpt</p>',
                        updatedAt: '01 de abril de 2021',
                    }
                }
            })
        )

    })
 })