import { render, screen } from "@testing-library/react";
import { SignInButton } from ".";
import { useSession } from 'next-auth/client'
import { mocked } from 'jest-mock'


jest.mock('next-auth/client')

describe('SignInButton component', () => {
    it('renders correctly when user is not logged in', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignInButton />
        );
        
        expect(screen.getByText('Sign in with Github')).toBeInTheDocument()
    })

    it('renders correctly when user is logged in', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: 'John Doe',
                email: 'john@example.com',
            },
            expires: 'fake-expire',
        }, 
            false])
        render(
            <SignInButton />
        );
        
        expect(screen.getByText('John Doe')).toBeInTheDocument()
    })
})