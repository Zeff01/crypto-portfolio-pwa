import Coin from "./Coin";

export default function NewCoins() {

    return  (
        <div className="flex flex-col gap-y-6 py-4">
            <p  className="font-semibold">NEW COINS</p>
            <div className="w-full flex  flex-row overflow-x-scroll gap-x-6 py-2">
                {newCoins.map(m =>  (
                    <Coin key={m.imageURL} {...m} />
                ))}
            </div>
        </div>
    )
}

const newCoins = [
    {
        imageURL: 'https://example.com/coin7.png',
        coinName: 'Litecoin',
        price: 180,
        priceChange: 2,
    },
    {
        imageURL: 'https://example.com/coin8.png',
        coinName: 'Ripple',
        price: 0.8,
        priceChange: -0.2,
    },
    {
        imageURL: 'https://example.com/coin9.png',
        coinName: 'Dogecoin',
        price: 0.1,
        priceChange: 0.02,
    },
    {
        imageURL: 'https://example.com/coin10.png',
        coinName: 'Chainlink',
        price: 30,
        priceChange: 3,
    },
    {
        imageURL: 'https://example.com/coin11.png',
        coinName: 'Stellar',
        price: 0.4,
        priceChange: 0.1,
    },
    {
        imageURL: 'https://example.com/coin12.png',
        coinName: 'VeChain',
        price: 0.15,
        priceChange: 0.05,
    },
];