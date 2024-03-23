import InvalidCredentialsModal from "@/components/auth/InvalidCredentialsModa"

export default function Test() {
    if (import.meta.env.PROD) {
        return null
    }

    return (
        <div>
            <InvalidCredentialsModal />
        </div>   
    )
}