import { FaGithub } from 'react-icons/fa'
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'
import { signIn, useSession, signOut} from 'next-auth/client'

export function SignInButton() {
    
    const [session] = useSession()

    return session ? (
        <button
        type="button"
        className={styles.signInButton}
        onClick={() => signOut()}
        >
            <FaGithub color="#04D361" />
            {session.user.name}
            <FiX  className={styles.closeButton}/>
        </button>
    ) : (
        <button
        type="button"
        className={styles.signInButton}
        onClick={() => signIn('github', {
            callbackUrl: "https://ignews-luiz-fel.vercel.app/"
        })}
        >
            <FaGithub color="#eba417" />
            Sign in with Github
        </button>
    );
}