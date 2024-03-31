import LogoSmall from "@/components/common/LogoSmall";
import SignupForm from "@/components/auth/SignupForm";
import { Link } from "react-router-dom";

export default function Signup() {
    return (
        <div className="w-screen pt-12 px-4 pe-10">
            <div className="flex flex-row items-center justify-center py-1">
                <LogoSmall className="absolute left-1" />
                <h2 className="translate-x-4">Crypto Profit</h2>
            </div>
            <SignupForm />
            <div className="flex flex-col items-center gap-y-2 text-sm pb-6">
                <p className="text-custom-text">Already Have an Account?</p>
                <Link to="/signin" className="text-custom-black dark:text-custom-teal">Sign In</Link>
            </div>
            
        </div>
    )
}