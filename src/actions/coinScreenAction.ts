import { getJwtFromStorage, getIdFromStorage } from "@/lib/helpers";
import { ProfileFetch } from "@/queries";
import { ActionFunctionArgs } from "react-router-dom";

export async function coinScreenAction({request}:ActionFunctionArgs) {
    const jwt = getJwtFromStorage()
    const id = getIdFromStorage()
    if (!id || !jwt) {
        console.error('missing id or jwt')
        return null
    }
    const formData = await request.formData();
    const strShares = formData.get('shares')
    const strData = formData.get('data') as string
    if (!strShares || !strData) {
        console.error('missing shares or data')
        return null
    }
    await ProfileFetch.updateSingleCoin(id, jwt, Number(strShares), JSON.parse(strData))

    return null

    
}