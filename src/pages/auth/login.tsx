import React, { useState, useEffect } from "react"
import { useRouter } from "next/router"
import { useTheme } from "next-themes"

import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";

import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import AuthLayout from "@/layouts/AuthLayout"
import Input from "@/components/Input"
import Button from "@/components/Button"
import Google from "../../assets/images/google.svg"
import Github from "../../assets/images/github.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import sx from "../../styles/login.module.scss"
import Loading from "@/components/Loading";
import Alert from "@/components/Alert";

export default function Login() {

    const { resolvedTheme } = useTheme()
    const theme = resolvedTheme

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [passType, setPassType] = useState(false)

    const router = useRouter()
    const callbackUrl = decodeURI((router.query?.callbackUrl as string) ?? "/");

    //Form Handler function
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        if (!email) {
            setErrorMsg("Email is required")
            setShowError(true)
            return
        }
        if (!password) {
            setErrorMsg("Password is required")
            setShowError(true)
            return
        }

        const result = await signIn("credentials", {
            redirect: false,
            email,
            password,
            callbackUrl: callbackUrl ?? "/",
        })

        if(result?.error) {
            setErrorMsg(result.error)
            setShowError(true)
        }

        if(result?.ok) {
            router.push(callbackUrl)
            setShowError(false)
        }
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl : "http://localhost:3000"})
    }

    // Google Handler function
    async function handleGithubSignin(){
        signIn('github', { callbackUrl : "http://localhost:3000"})
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
                {
                    showError && 
                    <Alert status="fail" variant="standard" action={<Button type="button" size="small" variant="text" status="fail" content="icon" onClick={() => setShowError(false)} theme={theme}><FontAwesomeIcon icon={"close"} /></Button>}>
                        <Alert.Title>Error</Alert.Title>
                        <Alert.Description>{errorMsg}</Alert.Description>
                    </Alert>
                }
                <form className={sx.form} onSubmit={handleSubmit}>
                    <Input name="email" type="email" placeholder="Email" size="large" value={email} theme={theme} iconBefore={<FontAwesomeIcon icon={faEnvelope} />} onChange={(e:any) => {setEmail(e.target.value)}} />
                    <Input name="password" type={`${passType ? "text" : "password"}`} placeholder="Password" size="large" value={password} iconBefore={<FontAwesomeIcon icon={faLock} />} iconAfter={<Button type="button" size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setPassType((prev) => !prev)}><FontAwesomeIcon icon={passType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => {setPassword(e.target.value)}} />
                    <Button size="large" type="submit" theme={theme}>Sign in</Button>
                    <div style={{'display': 'flex', 'gap': '16px'}}>
                        <Button size="large" type="button" variant="neutral" status="neutral" surface="2" theme={theme} style={{"width": "100%"}} onClick={handleGoogleSignin}><Image src={Google} alt="Google" width="16"/></Button>
                        <Button size="large" type="button" variant="neutral" status="neutral" surface="2" theme={theme} style={{"width": "100%"}} onClick={handleGithubSignin}><Image src={Github} alt="Github" width="16"/></Button>
                    </div>
                </form>
                <p className={sx.link}>Dont have an account yet? <Link href="/auth/register">Sign up</Link></p>
            </div>
        </AuthLayout>
    )

}

export async function getServerSideProps(context: GetServerSidePropsContext) {
    const session = await getServerSession(context.req, context.res, authOptions);
    
    // If the user is already logged in, redirect.
    // Note: Make sure not to redirect to the same page
    // To avoid an infinite loop!

    if (session) {
        return { redirect: { destination: "/" } };
    }

    return {
        props: await getProviders(),
    }
}