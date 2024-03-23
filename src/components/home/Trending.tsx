import Coin from "./Coin";

export default function Trending() {

    return  (
        <div>
            <p  className="font-semibold">TRENDING COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                {trendingCoins.map(m =>  (
                    <Coin key={m.imageURL} {...m} />
                ))}
            </div>
        </div>
    )
}

const trendingCoins = [
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