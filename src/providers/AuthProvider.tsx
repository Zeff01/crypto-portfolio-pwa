import { userUserData } from "@/hooks/useUserData";
import { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { AuthFetch } from "@/queries";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { ProfileFetch } from "@/queries";

const AuthContext = createContext<{appLoading:boolean; showIsPaidModal:boolean}>({appLoading:true, showIsPaidModal: false})

export default function AuthProvider({children}:{children:ReactNode}) {

    const [appLoading, setAppLoading] = useState(true)
    const [showIsPaidModal, setShowIsPaidModal]  = useState(false)
    const save = userUserData(s => s.save)
    const saveInfo = userUserData(s => s.saveInfo)
    const userData = userUserData(s => s.userData)
    const updateExchangeRate = useExchangeRate(s => s.updateExchangeRate)

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
            localStorage.removeItem('id')
        } finally {
            setAppLoading(false)
        }
    }

    async function getPaymentStatus(id:string, jwt:string) {
        try {
            const res = await ProfileFetch.getPaymentStatus(id, jwt)
            if (res.status === 200) {
                const isPaid = res.data.isPaid
                setShowIsPaidModal(!Boolean(isPaid))
                console.warn(`user is ${isPaid ? "paid" : "unpaid"}`)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // exchange rate checker
    useEffect(() => {
        updateExchangeRate()
    }, [])

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

    async function getUserInfo(userData: {session:Session; user: User}) {
        const jwt = userData?.session?.access_token
        const id = userData?.user?.id
        if (!jwt || !id) return null;
        try {
            const res = await ProfileFetch.getUserInfo(id, jwt)
            if  (res.status === 200) {
                return saveInfo(res.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    // localstorage data remover
    useEffect(() => {
        // user signed in
        if (userData) {
            localStorage.setItem('session', JSON.stringify(userData.session))
            localStorage.setItem('jwt', userData.session.access_token)
            localStorage.setItem('id', userData.user.id)
            getUserInfo(userData)
            return
        }
        // user signed out
        localStorage.removeItem('session')
        localStorage.removeItem('jwt')
    }, [userData])

    // checks the userdata and show the modal if unpaid
    useEffect(() => {
        if (!userData) {
            setShowIsPaidModal(false)
            return
        } 
        getPaymentStatus(userData.user.id, userData.session.access_token)
    }, [userData])

    return (
        <AuthContext.Provider value={{appLoading, showIsPaidModal}}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}