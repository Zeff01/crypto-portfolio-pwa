import Balance from "@/components/portfolio/Balance";
import CoinList from "@/components/portfolio/CoinList";
// import SignedOut from "@/components/portfolio/SignedOut";
import { userUserData } from "@/hooks/useUserData";

export default function Portfolio() {
    const userData = userUserData(s => s.userData)

    if (!userData) {
        return (
            null
            // <div className="bg-custom-background  px-4  dark:bg-custom-darkbackground py-6">
            //     <SignedOut />
            // </div>
        )
    }

    return (
        <div className="bg-custom-background  px-4  dark:bg-custom-darkbackground py-6">
            <p className="font-semibold pb-2">DASHBOARD ACCOUNT</p>
            <Balance />
            <CoinList />
        </div>
    )
}