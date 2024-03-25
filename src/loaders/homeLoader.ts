import { CoinFetch } from "@/queries"
import { LoaderFunctionArgs } from "react-router-dom"

export async function homeLoader({params, request}:LoaderFunctionArgs) {
    console.log('fetching home loaders')
    const p = params // for future uses
    const req = request // for future uses
    const globalMetricsRes = CoinFetch.getGlobalMetrics()
    const [gm] = await Promise.all([globalMetricsRes])
    return {
        globalMetrics: gm.data.data
    }
}