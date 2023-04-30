import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'
import { getProviders, signIn } from "next-auth/react"
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Input from '@/components/Input';
import Button from '@/components/Button';
import Alert from "@/components/Alert";
import Google from "../../assets/images/google.svg"
import Github from "../../assets/images/github.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose, faEnvelope, faEye, faEyeSlash, faShield, faUnlock, faLock } from "@fortawesome/free-solid-svg-icons";
import sx from '../../styles/register.module.scss';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
const PASS_REGEX = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/

export default function Register() {
    const { resolvedTheme:theme } = useTheme()
    const router = useRouter()

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordConfirm, setPasswordConfirm] = useState('')

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [passType, setPassType] = useState(false)
    const [repassType, setRepassType] = useState(false)

    const checkedEmail = EMAIL_REGEX.test(email)
    const checkedPassword = PASS_REGEX.test(password)
    const confirmPassword = password === passwordConfirm ? true : false

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        if (!checkedEmail) {
            setErrorMsg('The email is not valid!')
            setShowError(true)
            return
        }

        if (!checkedPassword) {
            setErrorMsg('The password entered is not valid!')
            setShowError(true)
            return
        }

        const response = await fetch('/api/register', {
            method: 'POST',
            cache: "no-cache",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password })
        }).then(async () => {
            console.log("The user was successfully registred");
            router.push('/auth/login');
        }).catch((error) => {
            console.log(error);
        });
    }

    // Google Handler function
    async function handleGoogleSignin(){
        signIn('google', { callbackUrl: process.env.APP_URL})
    }

    // Google Handler function
    async function handleGithubSignin(){
        signIn('github', { callbackUrl: process.env.APP_URL})
    }
    

    return (
        <AuthLayout>
            <Head>
                <title>Register</title>
            </Head>
            <div className="page_login">
                <div className={sx.description}>                
                    <h1 className="page_title">Register</h1>
                    <p>Welcome! Please enter your details.</p>
                </div>
                {
                    showError && 
                    <Alert status="fail" variant="standard" action={<Button type="button" size="xsmall" variant="text" status="fail" content="icon" onClick={() => setShowError(false)} theme={theme}><FontAwesomeIcon icon={faClose} /></Button>}>
                        <Alert.Title>Error</Alert.Title>
                        <Alert.Description>{errorMsg}</Alert.Description>
                    </Alert>
                }
                <form className={sx.form} onSubmit={handleSubmit}>
                    <Input name="email" type="email" placeholder="Email" size="large" value={email} theme={theme} iconBefore={<FontAwesomeIcon icon={faEnvelope} />} onChange={(e:any) => setEmail(e.target.value)} />
                    <Input name="password" type={`${passType ? "text" : "password"}`} placeholder="Password" size="large" value={password} iconBefore={<FontAwesomeIcon icon={checkedPassword === true ? faLock : faUnlock} />} iconAfter={<Button type="button" size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setPassType((prev) => !prev)}><FontAwesomeIcon icon={passType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => setPassword(e.target.value)} />
                    <Input name="confirm password" type={`${repassType ? "text" : "password"}`} placeholder="Confirm Password" size="large" value={passwordConfirm} iconBefore={<FontAwesomeIcon icon={confirmPassword === true ? faLock : faUnlock} />} iconAfter={<Button type="button" size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setRepassType((prev) => !prev)}><FontAwesomeIcon icon={repassType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => setPasswordConfirm(e.target.value)} />
                    <Button size="large" type="submit" theme={theme}>Sign up</Button>
                    <div style={{'display': 'flex', 'gap': '16px'}}>
                    <Button size="large" type="button" variant="neutral" status="neutral" surface="2" theme={theme} style={{"width": "100%"}} onClick={handleGoogleSignin}><Image src={Google} alt="Google" width="16"/></Button>
                        <Button size="large" type="button" variant="neutral" status="neutral" surface="2" theme={theme} style={{"width": "100%"}} onClick={handleGithubSignin}><Image src={Github} alt="Github" width="16"/></Button>
                    </div>
                </form>
                <p className={sx.link}>Already have an account? <Link href="/auth/login">Sign in</Link></p>
            </div>
        </AuthLayout>
    )
}