import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

export default function BalanceError() {
    const navigate =  useNavigate()

    return (
        <>
            <p>something went wrong...</p>
            <Button 
            className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
            onClick={() => {
                navigate('/')
                window.location.reload()
            }}>
                reload page
            </Button>
        </>
    )
}