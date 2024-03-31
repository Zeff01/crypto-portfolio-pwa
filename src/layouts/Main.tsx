import { NavLink, Outlet } from "react-router-dom";
import { HiHome } from "react-icons/hi2";
import { FaBriefcase } from "react-icons/fa";
import ThemeToggler from "@/components/common/ThemeToggler";
import Settings from "@/components/common/Settings";
import { useRef } from "react";
import { motion } from 'framer-motion'
import { useEffect } from "react";
import { userUserData } from "@/hooks/useUserData";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const settingsRef = useRef<HTMLButtonElement>(null)
    
    const navigate = useNavigate()
    const userData = userUserData(s => s.userData)
    
    useEffect(() => {
        // user is not logged in, and the path is neither /signup and /signin
        if (!userData) {
            console.log('user not logged in redirect to signin page')
            navigate('/signin', {replace:true})
        }
    }, [userData])


    return (
        <motion.div
        onPanStart={(e) => {
            const x = e.clientX
            if (x < 30) {
                settingsRef.current?.click()
            }
        }}
        className="h-full w-full flex flex-col"
        >
            <nav className="bg-custom-background dark:bg-custom-darkbackground z-10 h-12 px-2 py-8 w-full flex flex-row justify-between shadow-sm">
                <div className="flex flex-row items-center">
                    <div>
                        <img src="./icon.svg" />
                    </div>
                    <p className="text-xl font-[500] text-custom-black dark:text-custom-white">Crypto Profit</p>
                </div>
                <div className="flex flex-row items-center text-xl gap-x-2">
                    <ThemeToggler />
                    <Settings ref={settingsRef} />

                </div>
            </nav>
            <div className="flex-grow overflow-y-scroll overflow-x-hidden bg-custom-background dark:bg-custom-darkbackground">
            <Outlet />
            </div>
            <nav className=" bg-custom-background dark:bg-custom-darkbackground h-16 z-10  w-full flex flex-row border-t border-custom-border py-2">                
                <NavLink to="portfolio" className={({isActive}) => `${isActive? "text-custom-teal":  ""} basis-1/2 flex flex-col gap-y-1 items-center justify-center`}>
                    <div>
                        <FaBriefcase />
                    </div>
                    <p>Portfolio</p>
                </NavLink>
                <NavLink to="" className={({isActive}) => `${isActive? "text-custom-teal":  ""} basis-1/2 flex flex-col gap-y-1 items-center justify-center`}>
                    <div>
                        <HiHome />
                    </div>
                    <p>Home</p>
                </NavLink>
            </nav>
        </motion.div>
    )
}