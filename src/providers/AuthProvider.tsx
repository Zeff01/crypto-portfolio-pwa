import { userUserData } from "@/hooks/useUserData";
import { createContext, ReactNode, useContext, useState } from "react";
import { useEffect } from "react";
import { Session, User } from "@supabase/supabase-js";
import { AuthFetch } from "@/queries";
import { useExchangeRate } from "@/hooks/useExchangeRate";
import { ProfileFetch } from "@/queries";
import AppLoading from "@/components/common/AppLoading";
import { debounce } from "lodash";

const AuthContext = createContext<{appLoading:boolean; showIsPaidModal:boolean}>({appLoading:true, showIsPaidModal: false})

export default function AuthProvider({children}:{children:ReactNode}) {

    const [appLoading, setAppLoading] = useState(true)
    const [showIsPaidModal, setShowIsPaidModal]  = useState(false)
    const save = userUserData(s => s.save)
    const saveInfo = userUserData(s => s.saveInfo)
    const userData = userUserData(s => s.userData)
    const updateExchangeRate = useExchangeRate(s => s.updateExchangeRate)

    async function refreshSession() {
        console.log('refreshing session...')
        const sessionStr = localStorage.getItem('session') as string
        if (sessionStr) {
            try {            
                setAppLoading(true)
                const session = JSON.parse(sessionStr)
                const res = await AuthFetch.refresh(session)
                if (res.status === 201) {
                    const data  = res.data as {user:User, session:Session}                                                    

                    //--------------------------------------------------------------------------
                    // this nested trycatch is to protect the app from unnecessary crash
                    try {
                        // this sometimes fails in strict mode idk maybe because of batch write?
                        await ProfileFetch.updatePortfolio(data.user.id, data.session.access_token)                    
                    } catch (error) {
                        console.error('failed to update portfolio', error)
                    }
                    try {
                        await getUserInfo(data.user.id, data.session.access_token)                        
                    } catch (error) {
                        console.log('failed to get user info')
                    }
                    //-----------------------------------------------------------------------------
                    console.log('session found')
                    localStorage.setItem('session', JSON.stringify(data.session))
                    localStorage.setItem('id', data.user.id)
                    localStorage.setItem('jwt', data.session.access_token)
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
            return
        }
        console.log('session not found')
        setAppLoading(false)
        
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
        console.log('exchange rate checker useEffect')
        try {
            updateExchangeRate()            
        } catch (error) {
            console.error('update exchange rate failed', error)
        }
    }, [])

    // session refresher
    useEffect(() => {        
        console.log('refresh session useEffect')
        refreshSession()        
    }, [])

    async function getUserInfo(id:string, jwt:string) {        
        if (!jwt || !id) return 
        try {
            const res = await ProfileFetch.getUserInfo(id, jwt)
            if  (res.status === 200) {
                return saveInfo(res.data)
            }
        } catch (error) {
            console.error(error)
        }
    }

    const debouncedUpdatePortfolio = debounce((obj:any) => {
        if (userData) {
            const id = userData.user.id;
            const jwt = userData.session.access_token;
            obj.interval = setInterval(() => {
                ProfileFetch.updatePortfolio(id,jwt)
            }, 1_800_000)
        }
    }, 1800_000)


    // checks the userdata and show the modal if unpaid
    useEffect(() => {
        console.log('payment status useEffect')
        if (!userData) {
            setShowIsPaidModal(false)
            return
        } 
        getPaymentStatus(userData.user.id, userData.session.access_token)
    }, [userData])
    
    // profile data refresher
    useEffect(() => {
        console.log('update portfolio useEffect')
        const objInterval = {
            interval:undefined
        } as {interval:any}
            
        debouncedUpdatePortfolio(objInterval)
        return () => clearInterval(objInterval.interval)
    }, [userData])

    return (
        <AuthContext.Provider value={{appLoading, showIsPaidModal}}>
            {
            appLoading ?
            <AppLoading /> :
            children
            }
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    const context = useContext(AuthContext)
    return context
}