import { useState } from "react";
import { Link } from "react-router-dom";
import LogoSmall from "@/components/common/LogoSmall";
import RequestCodeForm from "@/components/auth/RequestCodeForm";
import VerifyCodeForm from "@/components/auth/VerifyCodeForm";
import NewPasswordForm from "@/components/auth/NewPasswordForm";

const FormSteps = [ // <-----------------------+
    RequestCodeForm,                         //|
    VerifyCodeForm,                          //|
    NewPasswordForm                          //|
] as const                                   //|
                                             //|
export default function ForgetPassword() {   //|
    const [step, setStep] = useState(0)      //|
                                             //|
    // this determines which form will be shown|
    function nextStep() {                    //|
        setStep(s => s+1)                    //|
    }                                        //|
                                             //|
    const CurrentForm = FormSteps[step]//------+      

    return (
        <div className="w-screen pt-12 px-4 pe-10">
            <div className="flex flex-row items-center justify-center py-1">
                <LogoSmall className="absolute left-1" />
                <h2 className="font-[500]">Crypto Profit</h2>
            </div>
            <CurrentForm 
            nextStep={nextStep} 
            />
            <div className="flex flex-col items-center gap-y-2 text-sm">
                <Link to="/signup" className=" text-custom-black dark:text-custom-teal">Create an Account Instead</Link>
            </div>
        </div>
    )
}
