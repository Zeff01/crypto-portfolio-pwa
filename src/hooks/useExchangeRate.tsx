import { CoinFetch } from "@/queries";
import { create } from "zustand";


type State = {
    exchangeRate: number
}
   
type Action = {
    updateExchangeRate() : void;
}

export const useExchangeRate = create<State & Action>((set) => ({
  exchangeRate: 1,
  updateExchangeRate: async () => {
    try {
        const res = await CoinFetch.getExchangeRate()
        set({exchangeRate: res.data.rates})
    } catch (error) {
        console.error(error)
    }

  }
}))
    