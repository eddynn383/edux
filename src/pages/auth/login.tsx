import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { signIn } from "next-auth/react"
import { useTheme } from "next-themes"
import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import AuthLayout from "@/layouts/AuthLayout"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Google from "../../assets/images/google.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import sx from "../../styles/login.module.scss"

export default function Login() {

    const { resolvedTheme:theme } = useTheme()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [passType, setPassType] = useState(false)

    const router = useRouter()
    const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

    //Form Handler function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        const result = await signIn("credentials", {
            email,
            password,
            callbackUrl: callbackUrl ?? "/",
            redirect: false
        })

        if(result?.error) {
            setError(result.error)
        }

        if(result?.ok) {
            router.push(callbackUrl)
        }
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    return (
        <AuthLayout>
            <Head>
                <title>Login</title>
            </Head>
            <div className="page_login">
                <div className={sx.description}>                
                    <h1 className="page_title">Login</h1>
                    <p>Welcome! Please enter your details.</p>
                </div>
                <div className={sx.error}>
                    {!!error && <p className="text-error">ERROR: {error}</p>}
                </div>
                <form className={sx.form} onSubmit={handleSubmit}>
                    <Input cn={sx.email} name="email" type="email" placeholder="Email" size="large" value={email} theme={theme} iconBefore={<FontAwesomeIcon icon={faEnvelope} />} onChange={(e:any) => {setEmail(e.target.value)}} />
                    <Input cn={sx.password} name="password" type={`${passType ? "text" : "password"}`} placeholder="Password" size="large" value={password} iconBefore={<FontAwesomeIcon icon={faLock} />} iconAfter={<Button size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setPassType((prev) => !prev)}><FontAwesomeIcon icon={passType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => {setPassword(e.target.value)}} />
                    <Button cn={sx.submit} size="large" type="submit" theme={theme}>Sign in</Button>
                    <Button cn={sx.submit} size="large" type="button" variant="neutral" status="neutral" theme={theme} onClick={handleGoogleSignin}><><Image src={Google} alt="Google" width="16"/> Sign In with Google</></Button>
                </form>
                <p className={sx.link}>Dont have an account yet? <Link href="/auth/register">Sign up</Link></p>
            </div>
        </AuthLayout>
    )

}