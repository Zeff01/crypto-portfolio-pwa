import { CoinFetch } from "@/queries"
import { defer } from "react-router-dom"

export async function homeLoader() {
    console.log('fetching home loaders')

    const globalMetrics = CoinFetch.getGlobalMetrics()
    const trendingTokens = CoinFetch.getTrending()
    
    return defer({
        globalMetrics,
        trendingTokens
    })
}