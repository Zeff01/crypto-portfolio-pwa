export type  HomeLoaders = {
    globalMetrics: GlobalMetrics
    trendingTokens: TrendingToken[]
}

export interface GlobalMetrics {
    active_cryptocurrencies: number;
    total_cryptocurrencies: number;
    active_market_pairs: number;
    active_exchanges: number;
    total_exchanges: number;
    eth_dominance: number;
    btc_dominance: number;
    eth_dominance_yesterday: number;
    btc_dominance_yesterday: number;
    eth_dominance_24h_percentage_change: number;
    btc_dominance_24h_percentage_change: number;
    defi_volume_24h: number;
    defi_volume_24h_reported: number;
    defi_market_cap: number;
    defi_24h_percentage_change: number;
    stablecoin_volume_24h: number;
    stablecoin_volume_24h_reported: number;
    stablecoin_market_cap: number;
    stablecoin_24h_percentage_change: number;
    derivatives_volume_24h: number;
    derivatives_volume_24h_reported: number;
    derivatives_24h_percentage_change: number;
    quote: {
        USD: {
            total_market_cap: number;
            total_volume_24h: number;
            total_volume_24h_reported: number;
            altcoin_volume_24h: number;
            altcoin_volume_24h_reported: number;
            altcoin_market_cap: number;
            defi_volume_24h: number;
            defi_volume_24h_reported: number;
            defi_24h_percentage_change: number;
            defi_market_cap: number;
            stablecoin_volume_24h: number;
            stablecoin_volume_24h_reported: number;
            stablecoin_24h_percentage_change: number;
            stablecoin_market_cap: number;
            derivatives_volume_24h: number;
            derivatives_volume_24h_reported: number;
            derivatives_24h_percentage_change: number;
            total_market_cap_yesterday: number;
            total_volume_24h_yesterday: number;
            total_market_cap_yesterday_percentage_change: number;
            total_volume_24h_yesterday_percentage_change: number;
            last_updated: string;
        };
    };
}

export interface TrendingToken {
    id: number;
    name: string;
    symbol: string;
    slug: string;
    num_market_pairs: number;
    date_added: string;
    tags: string[];
    max_supply: number;
    circulating_supply: number;
    total_supply: number;
    infinite_supply: boolean;
    platform: null | any;
    cmc_rank: number;
    self_reported_circulating_supply: null | any; 
    self_reported_market_cap: null | any; 
    tvl_ratio: null | any; 
    last_updated: string;
    quote: {
        USD: {
            price: number;
            volume_24h: number;
            volume_change_24h: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
            percent_change_30d: number;
            percent_change_60d: number;
            percent_change_90d: number;
            market_cap: number;
            market_cap_dominance: number;
            fully_diluted_market_cap: number;
            tvl: null | any; 
            last_updated: string;
        };
    };
    iconUrl: string;
}

export interface PortfolioItem {
    id: number;
    created_at: string;
    shares: number;
    coinId: number;
    coinImage: string;
    coinName: string;
    allTimeHigh: number;
    allTimeLow: number;
    athRoi: number;
    increaseFromATL: number;
    totalHoldings: number;
    trueBudgetPerCoin: number;
    additionalBudget: number;
    projectedRoi: number;
    marketCap: number;
    totalSupply: number;
    circulatingSupply: number;
    maxSupply: number;
    tradingVolume: number;
    marketCapRank: number;
    userId: string;
    priceChangeIcon: 'arrow-up' | 'arrow-down'; // Assuming only two possible values
    priceChangeColor: 'green' | 'red'; // Assuming only two possible values
    currentPrice: number;
    priceChangePercentage: number;
    orderIndex: number | null;
    coinSymbol: string;
    coinDescription: string;
    mustOwnShares: number;
    sharesMissing: number;
}