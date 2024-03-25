import axios from "axios";
import { API_URL } from "@/contants/environment";


class ProfileQuery {
    constructor(){}

    async getBudget(id:string, jwt:string) {
        const res = await axios.get(`${API_URL}/api/profile/budget/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async getTrueBudget(id:string, jwt:string, coinId:string) {
        const res = await axios.get(`${API_URL}/api/profile/truebudget/${id}/${coinId}`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async getPortfolioData(id:string, jwt:string,) {
        const res = await axios.get(`${API_URL}/api/profile/data/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async getUserInfo(id:string, jwt:string,) {
        const res = await axios.get(`${API_URL}/api/profile/userinfo/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async getPaymentStatus(id:string, jwt:string,) {
        const res = await axios.get(`${API_URL}/api/profile/paymentstatus/${id}`, {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    // TODO: update the  type of body
    async addCoin(id:string, jwt:string, body:any) {
        const res = await axios.post(`${API_URL}/api/profile/userinfo/${id}`, 
        body,
        {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async updateBudget(id:string, jwt:string, {newBudget}:{newBudget:number}) {
        const res = await axios.patch(`${API_URL}/api/profile/updatebudget/${id}`, 
        {newBudget},
        {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }

    async updatePortfolio(id:string, jwt:string) {
        const res = await axios.patch(`${API_URL}/api/profile/portfolio/${id}`, 
        {},
        {
            headers: {Authorization: `Bearer ${jwt}`}
        })
        return res
    }




}

export const ProfileFetch = new ProfileQuery()