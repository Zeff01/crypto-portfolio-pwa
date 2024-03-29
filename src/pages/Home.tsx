import Latest from "@/components/home/Latest"
import Trending from "@/components/home/Trending"
import NewCoins from "@/components/home/NewCoins"
import { userUserData } from "@/hooks/useUserData"
import { Link } from "react-router-dom"

export default  function Home() {

    const userInfo = userUserData(s => s.userInfo)
    const userData = userUserData(s => s.userData)

    return (        
        <div className="w-screen pt-6  px-4">
            <div className="px-2">
                {
                    userInfo ? 
                    <p  className="font-[500]">Welcome {userInfo.firstName.toLocaleUpperCase()}</p> :
                    <div className="font-[500]">
                        <p className="text-custom-text">
                        User not signed in,
                        </p>
                        <p className="flex flex-row gap-x-2">
                            <Link to={'/signin'} className="border-b underline">
                                Sign in
                            </Link>
                            <span>or</span>
                            <Link to={'/signup'} className="border-b underline">
                                Create an account
                            </Link>
                        </p>
                    </div>
                }
                <p  className="text-custom-text">Monitor Your Wallet’s Growth Today</p>
            </div>
            <Latest />
            <Trending />
            <NewCoins />
        </div>
                

    )
}