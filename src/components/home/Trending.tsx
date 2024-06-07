import { TrendingToken } from '@/types';
import Coin from './Coin';
import { Await, useLoaderData } from 'react-router-dom';
import CoinLoading from './CoinLoading';
import { Suspense, useEffect } from 'react';
import { usePrevData } from '@/hooks/usePrevData';
import CoinError from './CoinError';
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from '../ui/carousel';

const loadingArr = Array.from({ length: 10 });

export default function Trending() {
	const { trendingTokens } = useLoaderData() as { trendingTokens: Promise<any> };
	const prevCoins = usePrevData((s) => s.prevCoins);
	const setPrevCoins = usePrevData((s) => s.setPrevCoins);

	return (
		<div>
			<p className='font-semibold'>TRENDING COINS</p>
			<div className='flex  flex-row gap-x-6 py-2'>
				<Carousel
					className='w-full px-12'
					opts={{
						loop: true,
					}}
				>
					<CarouselContent>
						<Suspense fallback={<TrendingLoading prevCoins={prevCoins} />}>
							<Await
								resolve={trendingTokens}
								errorElement={<CoinError type='trending' />}
							>
								{(res) => {
									const trendingTokens = res.data as TrendingToken[];

									useEffect(() => {
										setPrevCoins(trendingTokens);
									}, [trendingTokens]);

									return (
										<>
											{trendingTokens.map((m) => (
												<CarouselItem
													key={m.id}
													className='md:max-w-fit'
												>
													<Coin {...m} />
												</CarouselItem>
											))}
										</>
									);
								}}
							</Await>
						</Suspense>
					</CarouselContent>
					<CarouselNext className='absolute top-2/4 right-2 bg-background dark:bg-custom-white dark:text-muted' />
					<CarouselPrevious className='absolute top-2/4 left-2 dark:bg-custom-white dark:text-muted' />
				</Carousel>
			</div>
		</div>
	);
}

function TrendingLoading({ prevCoins }: { prevCoins: null | TrendingToken[] }) {
	if (!prevCoins) {
		return (
			<>
				{loadingArr.map((_, i) => {
					return <CoinLoading key={i} />;
				})}
			</>
		);
	}
	return (
		<>
			{prevCoins.map((m) => (
				<Coin
					{...m}
					key={m.id}
				/>
			))}
		</>
	);
}
