import { userUserData } from "./useUserData";

export function getUserId() : string|null {
    const userData = userUserData(s => s.userData)
    if (!userData) {
        return null;
    }
    return userData.user.id
}