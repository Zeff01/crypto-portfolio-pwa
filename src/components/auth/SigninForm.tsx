import { ErrorMessage, Formik, Form, Field, } from "formik"
import Button from "../common/Button"
import InvalidCredentialsModal from "./InvalidCredentialsModa"
import { useRef } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { userUserData } from "@/hooks/useUserData"
import { User, Session } from '@supabase/supabase-js'
import { AuthFetch } from "@/queries"
import * as yup from 'yup'
import { useAuthContext } from "@/providers/AuthProvider"
import { Link } from "react-router-dom"

export default function SigninForm() {
    const modalTriggerRef =  useRef<HTMLButtonElement>(null)
    
    const [searchParams] = useSearchParams()
    const navigate =  useNavigate()
    const save = userUserData(s => s.save)
    const {getUserInfo} = useAuthContext()
    
    const email = searchParams.get('email')

    const initialValues = {
        email: email ?? "",
        password: ''
    }

    const SigninSchema = yup.object().shape({
        email: yup.string().trim().email('*must be a valid email').required('*must not be empty'),
        password: yup.string().min(1, '*must not be empty').required('*required')
    })

    async function login({email, password}: typeof initialValues) {
        console.log({email, password})
        try {
            // const res = await axios.post(`${API_URL}/api/auth/login`, values)
            const res = await AuthFetch.login({email:email.trim(),password})
            if (res.status === 200) {
                const data : {user: User, session:Session} = res.data
                localStorage.setItem('session', JSON.stringify(data.session))
                localStorage.setItem('id', data.user.id)
                localStorage.setItem('jwt', data.session.access_token)
                await getUserInfo(data.user.id, data.session.access_token)
                save(data)
                navigate('/')
            }
        } catch (error) {
            modalTriggerRef!.current?.click()
            console.error(error)
        }
    }

    return (
        <div className="pt-20 pb-12">
            <h1 className="text-2xl font-[500]">Sign In</h1>
            <Formik initialValues={initialValues} onSubmit={login} validationSchema={SigninSchema}>
                {(props) => (
                    <Form className="flex flex-col gap-2 pt-4 pb-2">
                        <div className="flex flex-col h-[80px] justify-start">
                            <label className="text-sm dark:text-custom-text">Email</label>
                            <Field type="text" name="email" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                            <ErrorMessage  name="email" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div> 
                        <div className="flex flex-col h-[80px] justify-start">
                            <label className="text-sm dark:text-custom-text">Password</label>
                            <Field type="password" name="password" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                            <ErrorMessage  name="password" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div>    
                        {/* will be implemented in the future */}
                        <p className="mt-10 text-sm dark:text-custom-text">Forgot password?
                        <Link to="/reset" className="underline ms-2">click here.</Link>
                        </p> 

                        <div className="flex justify-center pt-6">
                            <Button 
                            type="submit" 
                            disabled={props.isSubmitting || !props.isValid}
                            loading={props.isSubmitting}
                            className="bg-custom-black dark:bg-custom-teal text-custom-teal dark:text-custom-black w-full text-sm rounded-full transition-all dura"
                            >
                                Login
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
            <InvalidCredentialsModal className="hidden" ref={modalTriggerRef} />
        </div>
    )
}