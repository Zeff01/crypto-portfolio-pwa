import { Formik, Form, Field, } from "formik"
import { Button } from "../ui/button"

export default function SigninForm() {
    
    const initialValues = {
        email: '',
        password: ''
    }

    return (
        <div className="pt-20 pb-12">
            <h1 className="text-2xl font-[500]">Sign In</h1>
            <Formik initialValues={initialValues} onSubmit={()=>{}}>
                {(props) => (
                    <Form className="flex flex-col gap-2 pt-4 pb-2">
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Email</label>
                            <Field name="email" className="border-b border-custom-border py-1 px-2" />
                        </div> 
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Password</label>
                            <Field name="password" className="border-b border-custom-border py-1 px-2" />
                        </div>    
                        <p className="pt-10 text-sm">Forgot?</p>
                        <div className="flex justify-center pt-6">
                            <Button type="submit" className="bg-custom-black text-custom-teal w-full text-sm rounded-full">
                                Login
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}