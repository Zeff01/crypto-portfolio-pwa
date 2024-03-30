import { Await, useFetcher, useNavigate } from "react-router-dom"
import { useLoaderData } from "react-router-dom"
import { Suspense, useRef, useState } from "react"
import { PortfolioItem } from "@/types"
import { generateTableData } from "@/lib/formatter" 
import { DataToParse } from "@/lib/formatter"
import { useExchangeRate } from "@/hooks/useExchangeRate"
import { Button } from "@/components/ui/button"
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

                    const [shares, setShares] = useState(Number(tableData[0][1]))
                    const initialShares = useRef(shares)


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
                                            <div className="py-3 px-2 flex flex-row items-center justify-between bg-custom-white dark:bg-custom-card rounded-md shadow-md" key={key}>
                                                <p>{key}</p>
                                                <div className="relative flex flex-row items-center gap-2">
                                                    <input 
                                                    type="number" 
                                                    value={Number(shares)} 
                                                    onChange={(e) => setShares(Number(e.currentTarget.value))}
                                                    className={`text-right w-fit outline-none bg-transparent dark:bg-transparent ${editable ? "underline underline-offset-4" : ""}`}
                                                    min={0}
                                                    readOnly={!editable}
                                                    />
                                                    {
                                                        // user has made changes and is pending
                                                        (fetcher.state == "submitting" || fetcher.state == "loading") ?
                                                        <span className="text-xl">
                                                            <AiOutlineLoading3Quarters className="animate-spin" />
                                                        </span> :
                                                        // the user wants to edit but had not made any changes yet
                                                        editable && initialShares.current === shares ?
                                                        <span onClick={toggleEdit} className="text-xl">
                                                            <MdCancel />
                                                        </span> :                                                 
                                                        // the user had made changes and had option to confirm the changes       
                                                        editable ?
                                                        <span onClick={() => {
                                                            if (fetcher.state === 'idle') {
                                                                toggleEdit()
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

                                                        }} 
                                                        className="text-lg"
                                                        >
                                                            <FaCheckCircle />
                                                        </span> :
                                                        // user is not editing yet
                                                        <span onClick={() => {
                                                            if (fetcher.state === 'idle') {
                                                                toggleEdit()
                                                            }
                                                        }} 
                                                        className="text-lg"
                                                        >
                                                            <FaRegEdit />
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