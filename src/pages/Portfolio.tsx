import Balance from "@/components/portfolio/Balance";
import CoinList from "@/components/portfolio/CoinList";

export default function Portfolio() {
    return (
        <div className="bg-custom-background px-4  dark:bg-custom-background py-6">
            <p className="font-semibold pb-2">DASHBOARD ACCOUNT</p>
            <Balance />
            <CoinList />
        </div>
    )
}