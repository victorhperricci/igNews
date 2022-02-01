import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'
import { useSession } from 'next-auth/client'
import { SignInButton } from '.'

jest.mock('next-auth/client')


describe("SignInButton Component", () => {

    it('renders correctly when user is not authenticate', () => {
        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([null, false])

        render(
            <SignInButton />
        )

        expect(screen.getByText("Sign In with GitHub")).toBeInTheDocument();
    })

    it('renders correctly when user is authenticate', () => {

        const useSessionMocked = mocked(useSession)

        useSessionMocked.mockReturnValueOnce([{
            user: {
                name: "John Doe",
                email: "johdoe@hotmail.com",
            },
            expires: "fake-expires"
        }, false])

        render(
            <SignInButton />
        )

        expect(screen.getByText("John Doe")).toBeInTheDocument();
    })

})