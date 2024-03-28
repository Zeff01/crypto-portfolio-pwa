import { ActionFunctionArgs } from "react-router-dom";
import { ProfileFetch } from "@/queries";
import { getIdFromStorage, getJwtFromStorage } from "@/lib/helpers";

export async function  profileAction({request}:ActionFunctionArgs) {
    const jwt = getJwtFromStorage()
    const id = getIdFromStorage()
    if (!id || !jwt) {
        console.error('missing id or jwt')
        return null
    }

    const formData = await request.formData() // this converts data to strings

    const data = Object.fromEntries(formData) as {type: "change_balance"; newBudget:string; itemId:string;}
    if (data.type === 'change_balance') {
        await ProfileFetch.updateBudget(id,jwt, {newBudget: Number(data.newBudget)})
        return null
    
    }
    if (data.type === 'delete_coin') {
        await ProfileFetch.deleteCoin(id, jwt, data.itemId)
        return null
    }
    
    
    return null;
}