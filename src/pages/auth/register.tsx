import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTheme } from 'next-themes'
import Head from "next/head";
import Image from "next/image"
import Link from "next/link";
import AuthLayout from "@/layouts/AuthLayout";
import Input from '@/components/Input';
import Button from '@/components/Button';
import Alert from "@/components/Alert";
import Google from "../../assets/images/google.svg"
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
    const [role, setRole] = useState('user')

    const [showError, setShowError] = useState(false)
    const [errorMsg, setErrorMsg] = useState('')

    const [passType, setPassType] = useState(false)
    const [repassType, setRepassType] = useState(false)

    const checkedEmail = EMAIL_REGEX.test(email)
    const checkedPassword = PASS_REGEX.test(password)
    const confirmPassword = password === passwordConfirm ? true : false

    const handleSubmit = async (e:any) => {
        e.preventDefault()

        console.log(checkedEmail)
        console.log(checkedPassword)

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

        const response = await fetch('/api/auth/register', {
            method: 'POST',
            body: JSON.stringify({ email, password, role }),
            headers: {
                'Content-Type': 'application/json',
            }
        })

        if (response.ok) {
            router.push('/login');
        }
    }

    useEffect(() => {
        console.log(email)
        console.log(password)
        console.log(passwordConfirm)
      
    }, [])
    

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
                <Alert status="fail" variant="standard" action={<Button size="small" variant="text" status="fail" onClick={() => setShowError(false)}><FontAwesomeIcon icon={faClose} /></Button>}>
                    <Alert.Title>Error</Alert.Title>
                    <Alert.Description>{errorMsg}</Alert.Description>
                </Alert>
                }
                <form className={sx.form} onSubmit={handleSubmit}>
                    <Input cn={sx.email} name="email" type="email" placeholder="Email" size="large" value={email} theme={theme} iconBefore={<FontAwesomeIcon icon={faEnvelope} />} onChange={(e:any) => setEmail(e.target.value)} />
                    <Input cn={sx.password} name="password" type={`${passType ? "text" : "password"}`} placeholder="Password" size="large" value={password} iconBefore={<FontAwesomeIcon icon={checkedPassword === true ? faLock : faUnlock} />} iconAfter={<Button cn={sx['show-pass']} size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setPassType((prev) => !prev)}><FontAwesomeIcon icon={passType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => setPassword(e.target.value)} />
                    <Input cn={sx.repassword} name="confirm password" type={`${repassType ? "text" : "password"}`} placeholder="Confirm Password" size="large" value={passwordConfirm} iconBefore={<FontAwesomeIcon icon={confirmPassword === true ? faLock : faUnlock} />} iconAfter={<Button cn={sx['show-pass']} size="small" variant="text" status="neutral" content="icon" theme={theme} onClick={() => setRepassType((prev) => !prev)}><FontAwesomeIcon icon={repassType === true ? faEye : faEyeSlash} /></Button>} theme={theme} onChange={(e:any) => setPasswordConfirm(e.target.value)} />
                    <Button cn={sx.submit} size="large" type="submit" theme={theme}>Sign up</Button>
                    <Button cn={sx.submit} size="large" type="button" variant="neutral" status="neutral" theme={theme}><><Image src={Google} alt="Google" width="16"/> Sign Up with Google</></Button>
                </form>
                
                <p className={sx.link}>Already have an account? <Link href="/auth/login">Sign in</Link></p>
            </div>
        </AuthLayout>
    )
}