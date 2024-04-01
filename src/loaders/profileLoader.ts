import { defer } from "react-router-dom"
import { getJwtFromStorage, getIdFromStorage } from "@/lib/helpers"
import { ProfileFetch } from "@/queries"

export async function profileLoader() {    
    const jwt = getJwtFromStorage()
    const id = getIdFromStorage()
    if (!jwt || !id) {
        return null
    }
    ProfileFetch.updatePortfolio(id,jwt)

    const data = Promise.all([ProfileFetch.getBudget(id,jwt), ProfileFetch.getPortfolioData(id,jwt)])
    // const budgetPromise = ProfileFetch.getBudget(id,jwt)
    // const portfolioPromise = ProfileFetch.getPortfolioData(id,jwt)
    return defer({
        data
    })

}