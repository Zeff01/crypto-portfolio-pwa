import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHelp,  MdPrivacyTip } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";

import {
    Drawer,
    // DrawerClose,
    DrawerContent,
    // DrawerDescription,
    // DrawerFooter,
    // DrawerHeader,
    // DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import { userUserData } from "@/hooks/useUserData";
import axios from "axios";
import { API_URL } from "@/contants/environment";
import { AuthFetch } from "@/queries";
import { useNavigate } from "react-router-dom";

export default forwardRef(function Settings(_,ref:ForwardedRef<HTMLButtonElement>) {
    const navigate = useNavigate()
    const userData = userUserData(s => s.userData)
    const remove = userUserData(s => s.remove)
    const [userInfos, setUserInfos] = useState({
        firstName: ' ', 
        lastName: ' ', 
        username: '',
        email: 'user not signed in'
    }, )

    async function getUserInfo() {
        const jwt = userData?.session?.access_token
        const id = userData?.user?.id
        if (!jwt || !id) return null;
        try {
            const res = await axios.get(`${API_URL}/api/profile/userinfo/${id}`, {headers: {'Authorization': `Bearer ${jwt}`}})
            setUserInfos(res.data)
        } catch (error) {
            console.error(error)
        }
    }

    async function logout() {
        try {
            const res = await AuthFetch.signout()
            if (res.status === 200) {
                remove()
                navigate('/signin')
            }
        } catch (error) {
            console.error(error)
        }
    }


    useEffect(() => {
        getUserInfo()
    }, [userData])

    return (
        <Drawer direction="left">
            <DrawerTrigger ref={ref}>
                <RxHamburgerMenu />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col w-[300px] h-screen rounded-none">
               <div className="px-6 border-b border-custom-text dark:border-gray-800 flex flex-col gap-y-2 py-6">
                    <p className="text-sm dark:text-custom-teal">Personal Account</p>
                    <div className={`${userData? "opacity-100" : "opacity-0"} w-[70px] aspect-square rounded-full bg-custom-black  flex flex-col items-center justify-center`}>
                        <p className="text-custom-white font-[500] text-2xl">
                            {userInfos.firstName[0].toUpperCase()}
                            {userInfos.lastName[0].toUpperCase()}
                        </p>
                    </div>
                    <p className="font-[500] text-2xl">{userInfos.firstName}&nbsp;{userInfos.lastName}</p>
                    <p className="text-custom-text">{userInfos.email}</p>
               </div>
               <div className="px-6 py-12 flex-grow flex flex-col justify-between">
                    <div className="flex flex-col gap-y-4">
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 dark:bg-custom-card p-2">
                                <IoMdSettings className="fill-custom-black dark:fill-custom-teal" />
                            </div>

                            <p>Settings</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 dark:bg-custom-card p-2">
                                <MdOutlineHelp className="fill-custom-black dark:fill-custom-teal" />
                            </div>

                            <p>Help</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 dark:bg-custom-card p-2">
                                <MdPrivacyTip className="fill-custom-black dark:fill-custom-teal" />
                            </div>

                            <p>Privacy And Security</p>
                        </div>
                        <div className="flex flex-row gap-x-6 items-center">
                            <div  className="aspect-square rounded-full flex items-center justify-center bg-gray-200 dark:bg-custom-card p-2">
                                <LiaSignOutAltSolid className="fill-custom-black dark:fill-custom-teal" />
                            </div>

                            <p role="button" 
                            tabIndex={5}
                            onClick={logout}
                            >
                                Sign Out
                            </p>
                        </div>
                    </div>
                    <p className="dark:text-custom-teal">Terms and Conditions</p>
               </div>
            </DrawerContent>
        </Drawer>
    )
})