import { Form, Formik, Field, ErrorMessage } from "formik"
import * as yup from 'yup'
import Button from "../common/Button"

type RequestCodeFormProps = {
    nextStep: () => void;
}

export default function RequestCodeForm({nextStep}:RequestCodeFormProps) {
    const initialValues = {
        email: ''
    }

    const validationSchema = yup.object().shape({        
        email: yup.string().email('*must be a valid email').required('*must not be empty'),
    })

    async function handleSubmit(values:typeof initialValues) {
        console.log(values)
        nextStep()
    }

    return (

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {props => {
                return (
                    <Form className="pt-20 pb-12">
                        <div className="font-[500]">
                            <h1 className="text-2xl">Reset your password</h1>
                            <p className="text-sm">Enter your email address and we’ll send you a link to reset your password</p>
                        </div>
                            <div className="py-4">
                                <div className="flex flex-col h-[80px] justify-start gap-y-1">
                                    <label className="text-sm dark:text-custom-text">Email</label>
                                    <Field type="text" name="email" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                                    <ErrorMessage  name="email" >
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
                                    Send Code
                                </Button>
                            </div>
                    </Form>
                )
            }}
        </Formik>
    )
}