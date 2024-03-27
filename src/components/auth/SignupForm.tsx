import { ErrorMessage, Formik, Form, Field, } from "formik"
import Button from "../common/Button"
import * as yup from 'yup'
import { AuthFetch } from "@/queries"
import { useNavigate } from "react-router-dom"

export default function SignupForm() {
    const navigate = useNavigate()
    
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

    const validationSchema = yup.object().shape({
        firstName: yup.string().required('*must not be empty'),
        lastName: yup.string().required('*must not be empty'),
        username: yup.string().required('*must not be empty'),
        email: yup.string().email('*must be a valid email').required('*must not be empty'),
        password: yup.string().min(4, '*minimum of 4 characters').required('must not be empty'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], '*passwords must match')
            .required('*must confirm password'),
    })

    async function onSubmit({
        email, password, username, firstName, lastName, 
    }:typeof initialValues) {
        try {
            const res = await AuthFetch.signup({email, password, username, firstName, lastName})
            if (res.status == 201) {
                navigate(`/signin?email=${email}`)
            }
        } catch (error) {
            console.error('error')
        }
    }

    return (
        <div className="py-2 ">
            <h1 className="text-2xl font-[500]">Register</h1>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                {(props) => (
                    <Form className="flex flex-col gap-2 pt-4 pb-2">
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">First Name</label>
                            <Field readOnly={props.isSubmitting} name="firstName" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="first name..." />
                            <ErrorMessage  name="firstName" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div> 
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">Last Name</label>
                            <Field readOnly={props.isSubmitting} name="lastName" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="last name..." />
                            <ErrorMessage  name="lastName" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">Username</label>
                            <Field readOnly={props.isSubmitting} name="username" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="username..." />
                            <ErrorMessage  name="username" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">Email</label>
                            <Field readOnly={props.isSubmitting} name="email" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="youremail@gmail.com" />
                            <ErrorMessage  name="email" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">Password</label>
                            <Field readOnly={props.isSubmitting} name="password" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="****" type="password" />
                            <ErrorMessage  name="password" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                        </div>
                        <div className="flex flex-col h-[80px] gap-y-1 justify-start">
                            <label className="text-sm">Confirm Password</label>
                            <Field readOnly={props.isSubmitting} name="confirmPassword" className="border-b border-custom-border py-1 px-2 bg-transparent read-only:opacity:60" placeholder="****" type="password" />
                            <ErrorMessage  name="confirmPassword" >
                                {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                            </ErrorMessage>
                            
                        </div>
                        
                        <div className="flex justify-center pt-6">
                            <Button 
                            type="submit" 
                            loading={props.isSubmitting}
                            className="bg-custom-black  dark:bg-custom-teal text-custom-teal dark:text-custom-black w-full text-sm rounded-full transition-all duration-150"
                            disabled={props.isSubmitting||!props.isValid}
                            >
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}