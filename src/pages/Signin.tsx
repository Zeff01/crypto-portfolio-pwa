import LogoSmall from "@/components/common/LogoSmall";
import SigninForm from "@/components/auth/SigninForm";

export default function Signin() {
    return (
        <div className="w-screen pt-12 px-2 pe-10">
            <div className="flex flex-row items-center justify-center py-1">
                <LogoSmall className="absolute left-1" />
                <h2>Crypto Profit</h2>
            </div>
            <SigninForm />
            <div className="flex flex-col items-center gap-y-2 text-sm">
                <p className="text-custom-text">Don’t Have an Account Yet?</p>
                <p>Create Account   </p>
            </div>
        </div>
    )
}