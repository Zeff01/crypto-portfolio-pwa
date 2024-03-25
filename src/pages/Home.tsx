import Latest from "@/components/home/Latest"
import Trending from "@/components/home/Trending"
import NewCoins from "@/components/home/NewCoins"
import { useLoaderData, Await } from "react-router-dom"
import { HomeLoaders } from "@/types"
import { Suspense } from "react"

export default  function Home() {
    const { globalMetrics, trendingTokens } = useLoaderData() as HomeLoaders

    return (
        <Suspense fallback={<p className="px-4 py-6">loading...</p>}>
            <Await resolve={Promise.all([globalMetrics, trendingTokens])}
            errorElement={<p>something went wrong</p>}
            >
                { (data) => {
                const [ g, t ] = data                    
                const globalMetrics = g.data.data
                const trendingTokens = t.data
                return (<div className="w-screen pt-6  px-4">
                    <div className="px-2">
                        <p  className="font-[500]">Welcome Zeff</p>
                        <p  className="text-custom-text">Monitor Your Wallet’s Growth Today</p>
                    </div>
                    <Latest globalMetrics={globalMetrics} />
                    <Trending trendingTokens={trendingTokens} />
                    <NewCoins trendingTokens={trendingTokens} />
                </div>)}
                }
            </Await>
        </Suspense>
    )
}