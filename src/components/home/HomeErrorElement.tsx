import { useNavigate } from "react-router-dom"
import { Button } from "../ui/button"

type ErrorType =  "latest"|"trending"|"new"

export default function HomeErrorElement({type}:{type:ErrorType}) {
    const navigate =  useNavigate()

    const texts : Record<ErrorType,string>  = {
        "latest": "failed to load latest globalmetrics...",
        "trending": "failed to load trending tokens...",
        "new": "failed to load new tokens..."
    }

    return (
        <div className="flex flex-col gap-y-4 px-4 py-6">
            <p>{texts[type]}</p>
            <Button 
            className="px-0 w-fit text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
            onClick={() => {
                navigate('/')
                window.location.reload()
            }}>
                reload
            </Button>
        </div>
    )
}