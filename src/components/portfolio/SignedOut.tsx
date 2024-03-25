import { Link } from "react-router-dom";

export default function SignedOut() {
    return (
        <div className="translate-y-4">
            <Link to={'/signin'} className="font-[500] text-lg underline">
                Sign in to create a portfolio.
            </Link>
        </div>
    )
}