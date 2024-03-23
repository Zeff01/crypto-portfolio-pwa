import { Formik, Form, Field, } from "formik"
import { Button } from "../ui/button"

export default function SignupForm() {
    
    const initialValues = {
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    }

    return (
        <div className="py-2 ">
            <h1 className="text-2xl font-[500]">Register</h1>
            <Formik initialValues={initialValues} onSubmit={()=>{}}>
                {(props) => (
                    <Form className="flex flex-col gap-2 pt-4 pb-2">
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">First Name</label>
                            <Field name="firstName" className="border-b border-custom-border py-1 px-2 bg-transparent" placeholder="first name" />
                        </div> 
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Last Name</label>
                            <Field name="lastName" className="border-b border-custom-border py-1 px-2 bg-transparent" placeholder="last name" />
                        </div>
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Username</label>
                            <Field name="username" className="border-b border-custom-border py-1 px-2 bg-transparent" placeholder="username" />
                        </div>
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Email</label>
                            <Field name="email" className="border-b border-custom-border py-1 px-2 bg-transparent" placeholder="youremail@gmail.com" />
                        </div>
                        <div className="flex flex-col h-[71px] justify-between">
                            <label className="text-sm">Password</label>
                            <Field name="password" className="border-b border-custom-border py-1 px-2 bg-transparent" placeholder="****" type="password" />
                        </div>
                        
                        <div className="flex justify-center pt-6">
                            <Button type="submit" className="bg-custom-black  dark:bg-custom-teal text-custom-teal dark:text-custom-black w-full text-sm rounded-full">
                                Sign Up
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}