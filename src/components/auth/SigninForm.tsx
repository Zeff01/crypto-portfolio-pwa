import { Formik, Form, Field, } from "formik"
import Button from "../common/Button"
import { API_URL } from "@/contants/environment"
import axios from "axios"
import InvalidCredentialsModal from "./InvalidCredentialsModa"
import { useRef } from "react"
import { useNavigate } from "react-router-dom"
import { userUserData } from "@/hooks/useUserData"
import { User, Session } from '@supabase/supabase-js'
import * as yup from 'yup'

export default function SigninForm() {
    const modalTriggerRef =  useRef<HTMLButtonElement>(null)
    
    const navigate =  useNavigate()
    const save = userUserData(s => s.save)
    
    const initialValues = {
        email: '',
        password: ''
    }

    const SigninSchema = yup.object().shape({
        email: yup.string().email('*must be a valid email').required('*must not be empty'),
        password: yup.string().min(1, '*must not be empty').required('*required')
    })

    async function login(values: typeof initialValues) {
        console.log(values)
        try {
            const res = await axios.post(`${API_URL}/api/auth/login`, values)
            if (res.status === 200) {
                const data : {user: User, session:Session} = res.data
                save(data)
                navigate('/portfolio')
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
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm dark:text-custom-text">Email</label>
                            <Field type="text" name="email" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                        </div> 
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm dark:text-custom-text">Password</label>
                            <Field type="password" name="password" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                        </div>    
                        <p className="pt-10 text-sm dark:text-custom-text">Forgot?</p>
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