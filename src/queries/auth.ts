import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { API_URL } from "@/contants/environment";


class AuthQuery {
    constructor(){}

    async login({email,password}:{email:string;password:string}) {
        const res = await axios.post(`${API_URL}/api/auth/login`, {email,password})
        return res
    }

    async signup({email,password,username,firstName,lastName}: {email:string;password:string;username:string;firstName:string;lastName:string}) {
        const res = await axios.post(`${API_URL}/api/auth/signup`, {
            email,password,username,firstName,lastName
        })
        return res
    }

    async signout() {
        const res = await axios.get(`${API_URL}/api/auth/signout`)
        return res
    }

    async refresh(session:Session) {
        const res = await  axios.post(`${API_URL}/api/auth/refresh`, session)
        return res
    }

}

export const AuthFetch = new  AuthQuery()
