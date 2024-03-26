import { defer } from "react-router-dom"
import { getJwtFromStorage, getIdFromStorage } from "@/lib/helpers"
import { ProfileFetch } from "@/queries"

export async function profileLoader() {    
    const jwt = getJwtFromStorage()
    const id = getIdFromStorage()
    if (!jwt || !id) {
        return null
    }
    const budgetPromise = ProfileFetch.getBudget(id,jwt)
    const portfolioPromise = ProfileFetch.getPortfolioData(id,jwt)
    return defer({
        budgetPromise,
        portfolioPromise
    })

}