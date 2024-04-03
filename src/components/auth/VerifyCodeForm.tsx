import { Form, Formik, Field, ErrorMessage } from "formik"
import * as yup from 'yup'
import Button from "../common/Button"
import { useEffect, useState } from "react"
import { AuthFetch } from "@/queries"
import { useToast } from "../ui/use-toast"


type VerifyCodeFormProps = {
    email?: string;
    nextStep: (email:string) => void;
}

const INITIAL_TIME = 5
export default function VerifyCodeForm({email="", nextStep}:VerifyCodeFormProps) {
    const {toast} = useToast()
    
    const [timer, setTimer] = useState(INITIAL_TIME) 
    const [resendLoading, setResendLoading] = useState(false)

    function resetTimer() {
        setTimer(INITIAL_TIME)
    }

    async function handleResendCode() {
        setResendLoading(true)
        try {
            const res = await AuthFetch.requestResetPassword(email)
            if (res.status === 200) {
                resetTimer()
            }
        } catch (error) {
            console.error('error resending code to email', error)
        } finally {
            setResendLoading(false)
        }
    }
    

    const initialValues = {
        code: ''
    }
    

    const validationSchema = yup.object().shape({        
        code: yup.string().min(6, '*must be at least six digit').required('*must not be empty')
    })

    async function handleSubmit(values:typeof initialValues) {
        const { code } = values
        try {
            const res = await AuthFetch.verifyCode(email, code)
            if (res.status === 200) {                
                nextStep(email)
                return
            }
            toast({
                title: 'verify to reset password failed'
            })
        } catch (error) {
            toast({
                title: 'verify to reset password failed'
            })
        }
    }

    useEffect(() => {
        console.log('time effect')
        if (timer === 0) return;
        const timeout = setTimeout(() => {
            setTimer(t => t-1)
        }, 1000)

        return () => clearTimeout(timeout)
    }, [timer])

    return (

        <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
            {props => {
                return (
                    <Form className="pt-20 pb-12">
                            <div className="font-[500]">
                                <h1 className="text-2xl">Check your inbox</h1>
                                <p className="text-sm">An email with a code to reset your password was sent to the email address associated with your account</p>
                            </div>
                            <div className="py-4">
                                <div className="flex flex-col h-[80px] justify-start gap-y-1">
                                    <label className="text-sm dark:text-custom-text">Enter the code here.</label>
                                    <Field type="text" name="code" className="border-b border-custom-border py-1 px-2 bg-transparent" />
                                    <ErrorMessage  name="code" >
                                        {msg => <div className="text-sm text-custom-destructive">{msg}</div>}
                                    </ErrorMessage>
                                </div>                                                                
                            </div>
                            <p className="mt-10 text-sm dark:text-custom-text flex items-center">Didn't get an email?
                            {
                                timer > 0 ?
                                <span className="ps-2 py-0 h-fit text-sm text-custom-text">resend in {timer} seconds.</span> : 
                                <Button 
                                type="button" 
                                variant={"link"} 
                                className="text-sm ps-2 py-0 h-fit disabled:opacity-60"
                                onClick={handleResendCode}                                
                                disabled={resendLoading}
                                >
                                    Resend
                                </Button>
                            }
                            </p> 

                            <div className="flex justify-center pt-6">
                                <Button 
                                type="submit" 
                                disabled={props.isSubmitting || !props.isValid}
                                loading={props.isSubmitting}
                                className="bg-custom-black dark:bg-custom-teal text-custom-teal dark:text-custom-black w-full text-sm rounded-full transition-all dura"
                                >
                                    Verify Code
                                </Button>
                            </div>
                    </Form>
                )
            }}
        </Formik>
    )
}