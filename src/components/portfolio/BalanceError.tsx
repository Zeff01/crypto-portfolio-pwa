import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function BalanceError() {
    const navigate =  useNavigate()

    return (
        <div className="h-[250px] bg-custom-white dark:bg-custom-darkbackground shadow-lg w-full flex flex-col justify-between py-8 px-6 rounded-lg border border-transparent dark:border-gray-700">
            <p>something went wrong...</p>
            <Button 
            className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
            onClick={() => {
                navigate('/')
                window.location.reload()
            }}>
                reload page
            </Button>
        </div>
    )
}