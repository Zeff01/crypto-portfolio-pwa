import { Session } from "@supabase/supabase-js";

export const safeToFixed = (value:any, digits = 2, fallback = "N/A") => {
    try {
      return Number(value).toFixed(digits);
    } catch (error) {
      console.error("Error formatting number:", error);
      return fallback;
    }
  };

export function getIdFromStorage() : string|null {
  return localStorage.getItem('id')
}

export function getJwtFromStorage() : string|null {
  return localStorage.getItem('jwt')
}

export function getSessionFromStorage() : Session|null {
  const strSession = localStorage.getItem('session')
  if (strSession === null) {
    return strSession
  }
  const session : Session = JSON.parse(strSession)
  return session
}