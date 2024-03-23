import Latest from "@/components/home/Latest"
import Trending from "@/components/home/Trending"
import NewCoins from "@/components/home/NewCoins"

export default  function Home() {
    return (
        <div className="w-screen pt-6  px-4">
            <div className="px-2">
                <p  className="font-[500]">Welcome Zeff</p>
                <p  className="text-custom-text">Monitor Your Wallet’s Growth Today</p>
            </div>
            <Latest />
            <Trending />
            <NewCoins />
        </div>
    )
}