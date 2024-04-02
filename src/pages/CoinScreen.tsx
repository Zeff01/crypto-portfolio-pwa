import { Await, useFetcher, useNavigate } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import { Suspense, useState } from "react"
import { PortfolioItem } from "@/types"
import { generateTableData } from "@/lib/formatter" 
import { DataToParse } from "@/lib/formatter"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TbArrowBack } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { userUserData } from "@/hooks/useUserData"
import { FaRegEdit, FaCheckCircle, } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import RootErrorBoundary from "@/components/common/RootErrorBoundary"


export default function CoinScreen() {
    const  {portfolioPromise} = useLoaderData() as {portfolioPromise: Promise<any>}
    const exchangeRate = useExchangeRate(s => s.exchangeRate)
    const [descExpanded, setDescExpanded] = useState(false)
    const userData = userUserData(s => s.userData)
    const navigate = useNavigate()
    const [editable, setEditable] = useState(false)  
    const fetcher = useFetcher();
    const updateShares = fetcher.submit

    function toggleDescription() {
        setDescExpanded(d => !d)
    }

    function toggleEdit() {
        setEditable(e => !e)
    }

    function handleSubmit(coinData:PortfolioItem, shares:number, initialShares:number) {
        if (shares === initialShares) {
            toggleEdit()
            return;
        }; // when no changes the cancel icon will appear
        if (shares <= 0) return; // cannot set the shares to zero
        try {
            updateShares(
                {
                data: JSON.stringify(coinData),
                shares,
                formEnctype: 'application/json'                                                                    
                },
                {
                    method:'PUT',
                    action: '',
                    
                }
            )
        }         
        catch (error) {
            console.error('error encountered when updating coin shares')
        }  finally {
            toggleEdit()
        }
    }

    if (!userData) {
        return null
    }

    return (
        
        <Suspense fallback={
            <div className="px-4 py-6 h-[400px] w-full flex items-center justify-center">
                <div className="text-5xl">
                    <AiOutlineLoading3Quarters className="animate-spin" />
                </div>
            </div>
        }>
            <Await resolve={portfolioPromise}  errorElement={<RootErrorBoundary />}>
                {(res) => {
                    const coinData = res.data.data as PortfolioItem

                    const tableData = generateTableData(coinData, DataToParse, exchangeRate)
                    const initialShares = Number(tableData[0][1])
                    const [shares, setShares] = useState(Number(tableData[0][1]))


                    return (
                        <div className="px-4 py-6">
                            <div className="relative flex flex-col items-center gap-y-3">
                                <img src={coinData.coinImage} width={70} height={70} className="rounded-full shadow-lg" />
                                <p className="text-center font-bold text-2xl drop-shadow-sm">{coinData.coinName}</p>
                                <p className="px-4 text-center">
                                    {
                                    descExpanded ?
                                    coinData.coinDescription :
                                    coinData.coinDescription.substring(0, 100) + '...'
                                    }
                                </p>
                                <Button 
                                variant="ghost" 
                                className="text-blue-600 dark:text-blue-300 hover:bg-transparent"
                                onClick={toggleDescription}
                                >                                    
                                    Show More
                                </Button>
                                <Button variant={"ghost"} size={"icon"} className="absolute top-0 left-4  hover:bg-transparent shadow-md rounded-full"
                                onClick={() => navigate('/portfolio')}
                                >
                                    <TbArrowBack className="text-3xl stroke-custom-black dark:stroke-custom-teal" />
                                </Button>
                            </div>
                            <div className="flex flex-col w-full  py-4 gap-y-4 font-[500]">
                                {tableData.map((r) => {
                                    const key =  r[0];
                                    const value = r[1];                                    
                                    if (key === 'Shares') {
                                        return (
                                            <div className="py-3 px-2 flex flex-row items-center justify-between bg-custom-white dark:bg-custom-card rounded-md shadow-md text-custom-black dark:text-custom-white" key={key}>
                                                <p>{key}</p>
                                                <div className="relative flex flex-row items-center gap-3">
                                                    <Input
                                                    type="number" 
                                                    value={Number(shares)} 
                                                    onChange={(e) => setShares(Number(e.currentTarget.value))}
                                                    className={`px-1 text-right w-[150px] outline-none bg-transparent dark:bg-transparent ${editable ? "" : "border-none"}`}
                                                    min={0}
                                                    contentEditable={editable}
                                                    />
                                                    {      
                                                        editable ?
                                                        <span onClick={() => {
                                                            if (fetcher.state === 'idle') {
                                                                handleSubmit(coinData, shares, initialShares) 
                                                            }

                                                        }} 
                                                        className="text-lg"
                                                        >
                                                            {
                                                            editable && (shares === initialShares) ? // no changes made
                                                            <MdCancel className="text-xl" /> :
                                                            <FaCheckCircle />
                                                            }
                                                        </span> :
                                                        // user is not editing yet
                                                        <span onClick={() => {
                                                            if (fetcher.state === 'idle') {
                                                                toggleEdit()
                                                            }
                                                        }} 
                                                        className="text-lg"
                                                        >
                                                            {
                                                                fetcher.state === 'submitting' ?
                                                                <AiOutlineLoading3Quarters className="animate-spin" /> :                                                                
                                                                <FaRegEdit /> 
                                                            }
                                                        </span>
                                                    }
                                                </div>
                                                
                                            </div>
                                        )
                                    }
                                    return (
                                        <div key={key} className="py-2 px-2 flex flex-row items-center justify-between bg-custom-white dark:bg-custom-card rounded-md shadow-md">
                                            <p className="basis-[40%]">{key}</p>
                                            {
                                                typeof value === 'string' && value.includes('|') ?
                                                <p className="flex flex-col">
                                                    {value.split('|').map((item,idx) => {
                                                        return (
                                                            <span key={idx} className="text-right">{item}</span>
                                                        )
                                                    })}
                                                </p> :
                                                <p>{value}</p>
                                            }

                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                }}
            </Await>
        
        </Suspense>
    )
}