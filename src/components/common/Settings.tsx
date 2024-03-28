import { RxHamburgerMenu } from "react-icons/rx";
import { IoMdSettings } from "react-icons/io";
import { MdOutlineHelp,  MdPrivacyTip } from "react-icons/md";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { MdQuestionMark } from "react-icons/md";

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
import { ForwardedRef, forwardRef,} from "react";
import { userUserData } from "@/hooks/useUserData";

import { AuthFetch } from "@/queries";
import { Link, useNavigate } from "react-router-dom";

export default forwardRef(function Settings(_,ref:ForwardedRef<HTMLButtonElement>) {
    const navigate = useNavigate()
    const userData = userUserData(s => s.userData)
    const userInfo = userUserData(s => s.userInfo)
    const remove = userUserData(s => s.remove)



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



    return (
        <Drawer direction="left">
            <DrawerTrigger ref={ref}>
                <RxHamburgerMenu />
            </DrawerTrigger>
            <DrawerContent className="flex flex-col w-[300px] h-screen rounded-none">
               <div className="px-6 border-b border-custom-text dark:border-gray-800 flex flex-col gap-y-2 py-6">
                    <p className="text-sm dark:text-custom-teal">Personal Account</p>
                   
                    {userInfo ?
                    <>
                     <div className={`${userData? "opacity-100" : "opacity-0"} w-[70px] aspect-square rounded-full bg-custom-black  flex flex-col items-center justify-center`}>
                        <p className="text-custom-white font-[500] text-2xl">
                            {userInfo.firstName[0].toUpperCase()}
                            {userInfo.lastName[0].toUpperCase()}
                        </p>
                    </div>
                    <p className="font-[500] text-2xl">{userInfo.firstName}&nbsp;{userInfo.lastName}</p>
                    <p className="text-custom-text">{userInfo.email}</p>                    
                    </> :
                    <>
                    <div className={`w-[70px] aspect-square rounded-full flex flex-col items-center justify-center border-2 border-custom-border dark:border-custom-teal`}>
                        <MdQuestionMark className="text-custom-border dark:text-custom-teal text-3xl" />
                    </div>
                    <Link to="signup" className="font-[500] underline underline-offset-4">Create a new account</Link>
                    <Link to="signin" className="font-[500] underline underline-offset-4">Login to your account</Link>                    
                    </>
                    }
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
                            {
                            userData ?
                            <p role="button" 
                            tabIndex={5}
                            onClick={logout}
                            >
                                Sign Out
                            </p> :
                            <p className="text-custom-text">user not signed in</p>                                                          
                            }
                        </div>
                    </div>
                    <p className="dark:text-custom-teal">Terms and Conditions</p>
               </div>
            </DrawerContent>
        </Drawer>
    )
})