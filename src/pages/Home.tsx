import Latest from "@/components/home/Latest"
import Trending from "@/components/home/Trending"
import NewCoins from "@/components/home/NewCoins"
import { useLoaderData } from "react-router-dom"
import { HomeLoaders } from "@/types"

export default  function Home() {
    const { globalMetrics } = useLoaderData() as HomeLoaders
    console.log({globalMetrics})

    return (
        <div className="w-screen pt-6  px-4">
            <div className="px-2">
                <p  className="font-[500]">Welcome Zeff</p>
                <p  className="text-custom-text">Monitor Your Wallet’s Growth Today</p>
            </div>
            <Latest globalMetrics={globalMetrics} />
            <Trending />
            <NewCoins />
        </div>
    )
}