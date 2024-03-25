import { CoinFetch } from "@/queries"
import { LoaderFunctionArgs, defer } from "react-router-dom"

export async function homeLoader({params, request}:LoaderFunctionArgs) {
    console.log('fetching home loaders')
    const p = params // for future uses
    const req = request // for future uses
    const globalMetrics = CoinFetch.getGlobalMetrics()
    const trendingTokens = CoinFetch.getTrending()
    
    return defer({
        globalMetrics,
        trendingTokens
    })
}