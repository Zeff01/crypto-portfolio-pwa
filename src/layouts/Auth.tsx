
import { Outlet, useNavigate } from "react-router-dom";
import { userUserData } from "@/hooks/useUserData";
import { useEffect } from "react";

export default function Auth() {
    const userData = userUserData(s => s.userData)
    const navigate = useNavigate()

    useEffect(() => {
        console.log('signin redirect useEffect')
        console.log({userData})
        if (userData) {
            console.log('a user is logged in')
            navigate('/', {replace:true})
        }
    }, [userData])

    if (userData) {
        return null;
    }

    return (
        <>
            <Outlet />
        </>
    )
}