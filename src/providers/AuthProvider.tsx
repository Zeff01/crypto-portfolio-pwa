import { userUserData } from "@/hooks/useUserData";
import { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { AuthFetch } from "@/queries";

const AuthContext = createContext<{appLoading:boolean}>({appLoading:true})

export default function AuthProvider({children}:{children:ReactNode}) {

    const [appLoading, setAppLoading] = useState(true)
    const save = userUserData(s => s.save)
    const userData = userUserData(s => s.userData)

    async function refreshSession(session:Session) {
        try {
            const res = await AuthFetch.refresh(session)
            if (res.status === 201) {
                const data  = res.data as {user:User, session:Session}                
                save(data)
            }
        } catch (error) {
            console.log('user not logged in')
            localStorage.removeItem('session')
            localStorage.removeItem('jwt')
        } finally {
            setAppLoading(false)
        }
    }

    // session refresher
    useEffect(() => {
        const sessionStr = localStorage.getItem('session')
        if (sessionStr) {
            const session = JSON.parse(sessionStr)
            refreshSession(session)        
        }
        else {
            setAppLoading(false)
        }
    }, [])

    // localstorage data remover
    useEffect(() => {
        // user signed in
        if (userData) {
            localStorage.setItem('session', JSON.stringify(userData.session))
            localStorage.setItem('jwt', userData.session.access_token)
            return
        }
        // user signed out
        localStorage.removeItem('session')
        localStorage.removeItem('jwt')
    }, [userData])

    return (
        <AuthContext.Provider value={{appLoading}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}