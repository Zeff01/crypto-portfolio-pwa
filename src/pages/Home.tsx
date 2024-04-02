import Latest from "@/components/home/Latest"
import Trending from "@/components/home/Trending"
import NewCoins from "@/components/home/NewCoins"
import { userUserData } from "@/hooks/useUserData"

export default  function Home() {

    const userInfo = userUserData(s => s.userInfo)
    const userData = userUserData(s => s.userData)

    return (        
        <div className="w-screen pt-6  px-4">
            <div className="px-2">
                {
                    userInfo && userData ? 
                    <p  className="font-[500]">Welcome {userInfo.firstName.toLocaleUpperCase()}</p> :
                    <p  className="font-[500]">Welcome User</p>
                }
                <p  className="text-custom-text">Monitor Your Wallet’s Growth Today</p>
            </div>
            <Latest />
            <Trending />
            <NewCoins />
        </div>
                

    )
}