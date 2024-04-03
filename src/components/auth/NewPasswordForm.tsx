import { Form, Formik, Field, ErrorMessage } from "formik"
import * as yup from 'yup'
import Button from "../common/Button"

export default function NewPasswordForm({email=""}:{email?:string}) {
    const initialValues = {
        password: '',
        confirmPassword: ''
    }

    const validationSchema = yup.object().shape({        
        password: yup.string().min(4, '*minimum of 4 characters').required('*must not be empty'),
        confirmPassword: yup.string()
            .oneOf([yup.ref('password')], '*passwords must match')
            .required('*must confirm password'),
    })

    async function handleSubmit(values:typeof initialValues) {
        console.log(values)
    }

    return (

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {props => {
                return (
                    <Form className="pt-20 pb-12">
                        <div className="font-[500]">
                            <h1 className="text-2xl">Reset your password</h1>
                            <p className="text-sm">Enter your your new passowrd</p>
                        </div>
                            <div className="py-4 flex flex-col gap-y-2">
                                <div className="flex flex-col h-[80px] justify-start gap-y-1">
                                    <label className="text-sm dark:text-custom-text">New Password</label>
                                    <Field type="password" name="password" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                                    <ErrorMessage  name="password" >
                                        {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                                    </ErrorMessage>
                                </div> 
                                <div className="flex flex-col h-[80px] justify-start gap-y-1">
                                    <label className="text-sm dark:text-custom-text">Confirm New Password</label>
                                    <Field type="password" name="confirmPassword" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                                    <ErrorMessage  name="confirmPassword" >
                                        {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                                    </ErrorMessage>
                                </div>                            
                            </div>
                            <div className="flex justify-center pt-6">
                                <Button 
                                type="submit" 
                                disabled={props.isSubmitting || !props.isValid}
                                loading={props.isSubmitting}
                                className="bg-custom-black dark:bg-custom-teal text-custom-teal dark:text-custom-black w-full text-sm rounded-full transition-all dura"
                                >
                                    Change Password
                                </Button>
                            </div>
                    </Form>
                )
            }}
        </Formik>
    )
}