import LogoSmall from "@/components/common/LogoSmall";
import SigninForm from "@/components/auth/SigninForm";
import { Link } from "react-router-dom";

export default function Signin() {
    return (
        <div className="w-screen pt-12 px-4 pe-10">
            <div className="flex flex-row items-center justify-center py-1">
                <LogoSmall className="absolute left-1" />
                <h2>Crypto Profit</h2>
            </div>
            <SigninForm />
            <div className="flex flex-col items-center gap-y-2 text-sm">
                <p className="text-custom-text">Don’t Have an Account Yet?</p>
                <Link to="/signup" className="text-custom-black dark:text-custom-teal">Create Account   </Link>
                {/* <Link to="/" className="pb-6 text-custom-text underline">Back to home</Link> */}
            </div>
        </div>
    )
}