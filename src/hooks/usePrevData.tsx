

import { GlobalMetrics, PortfolioItem, TrendingToken } from '@/types';
import { create } from 'zustand'

type State = {
    prevLatest: null|GlobalMetrics
    prevCoins: null|TrendingToken[]
    prevBudget: null|number;
    prevPortfolio: null|PortfolioItem[]
}

type Action = {
    setPrevLatest: (value: null|GlobalMetrics) => void;
    setPrevCoins: (value: null|TrendingToken[]) => void;
    setPrevBudget: (value: null|number) => void;
    setPrevPortfolio: (value:null|PortfolioItem[]) => void;
}

export const usePrevData = create<State & Action>((set) => ({
    prevLatest:null,
    prevCoins:null,
    prevBudget:null,
    prevPortfolio:null,

    setPrevLatest: (value) => set({prevLatest:value}),
    setPrevCoins: (value) => set({prevCoins:value}),
    setPrevBudget: (value) => set({prevBudget:value}),
    setPrevPortfolio: (value) => set({prevPortfolio:value}),
}))
    