import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function CoinListError() {
    const navigate =  useNavigate()

    return (
        <div className="flex flex-col gap-y-4 px-4 py-6">
            <p>something went wrong...</p>
            <Button 
            className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
            onClick={() => {
                navigate('/portfolio')
                window.location.reload()
            }}>
                reload
            </Button>
        </div>
    )
}