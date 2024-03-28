import { useEffect } from "react"
import { useNavigate, useRouteError, } from "react-router-dom"
import Button from "./Button"

export default function RootErrorBoundary() {
    const error = useRouteError()
    const navigate = useNavigate()

    useEffect(() => {
        console.log(error)
    }, [error])

    return (
        <div className="py-6 px-4">
            <p>something went wrong...</p>
            <Button 
            className="text-lg bg-transparent hover:bg-transparent dark:bg-transparent underline" variant={"link"}
            onClick={() => {
                navigate('/')
                window.location.reload()
            }}>
                reload page
            </Button>
        </div>
    )
}