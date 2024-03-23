import Controls from "./Controls";
import CoinCard from "./CoinCard";

export  default function CoinList() {
    return (
        <section className="py-4 flex flex-col gap-y-4">
            <Controls />
            <div className="flex flex-row flex-wrap">
                {portfolioCoins.map((p,i) => {
                    return (
                        // NOTE: index is used here for padding
                        <CoinCard key={p.imageURL} {...p} index={i} />
                    )
                })}
            </div>
        </section>
    )
}


const portfolioCoins = [
    {
        imageURL: 'https://example.com/coin1.png',
        coinName: 'Bitcoin',
        price: 60000,
        priceChange: 5,
    },
    {
        imageURL: 'https://example.com/coin2.png',
        coinName: 'Ethereum',
        price: 2000,
        priceChange: 5,
    },
    {
        imageURL: 'https://example.com/coin3.png',
        coinName: 'Cardano',
        price: 1.5,
        priceChange: 0.5,
    },
    {
        imageURL: 'https://example.com/coin4.png',
        coinName: 'Binance Coin',
        price: 300,
        priceChange: -5,
    },
    {
        imageURL: 'https://example.com/coin5.png',
        coinName: 'Solana',
        price: 150,
        priceChange: 5,
    },
    {
        imageURL: 'https://example.com/coin6.png',
        coinName: 'Polkadot',
        price: 50,
        priceChange: 5,
    },
];