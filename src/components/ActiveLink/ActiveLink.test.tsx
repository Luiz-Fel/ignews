import { ActiveLink } from ".";
import { render, screen } from '@testing-library/react'


jest.mock('next/router', () => {
    return {
        useRouter() {
            return {
                asPath: '/'
            }
        }
    }
})

describe('ActiveLink component', () => {
    
    it('renders correctly', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        );
        
        expect(screen.getByText('Home')).toBeInTheDocument()
    })


    
    it('is receiving active class if the link is currently active', () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        );
        
        expect(screen.getByText('Home')).toHaveClass('active')
    })
})

