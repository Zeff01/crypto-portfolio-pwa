import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import CoinCard from "./CoinCard";

export  default function CoinList() {
    return (
        <section className="py-4 flex flex-col gap-y-4">
            <div className="flex flex-row justify-end gap-x-2">
                <Button variant={"ghost"} size={"icon"} className="scale-125">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="16" height="7" rx="2" fill="#1E1E1E"/>
                        <rect y="9" width="16" height="7" rx="2" fill="#1E1E1E"/>
                    </svg>
                </Button>
                <Button variant={"ghost"} size={"icon"} className="scale-125">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="7" height="7" rx="2" fill="#1E1E1E"/>
                        <rect x="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                        <rect y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                        <rect x="9" y="9" width="7" height="7" rx="2" fill="#1E1E1E"/>
                    </svg>
                </Button>
                <Button className="gap-x-1 rounded-full px-4">
                    <FaPlus className="fill-custom-teal" />
                    <p className="text-sm font-[500]">Add</p>
                </Button>
            </div>
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