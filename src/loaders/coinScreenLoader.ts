import { defer, LoaderFunctionArgs } from "react-router-dom"
import { getJwtFromStorage, getIdFromStorage } from "@/lib/helpers"
import { ProfileFetch } from "@/queries"

export async function coinScreenLoader({params}: LoaderFunctionArgs) {    
    const { coinId } = params
    const jwt = getJwtFromStorage()
    const id = getIdFromStorage()
    console.log({coinId, id, jwt}, 'in the params')
    if (!jwt || !id || coinId === undefined) {
        return null
    }
    const portfolioPromise = ProfileFetch.getPortfolioCoinData(id,jwt, coinId)
    return defer({
        portfolioPromise
    })

}