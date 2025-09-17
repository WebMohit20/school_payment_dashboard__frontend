import { useState, useEffect, useContext } from 'react'
import { useSearchParams, useNavigate } from "react-router-dom"
import { ArrowDownWideNarrow,ArrowDownNarrowWide } from 'lucide-react'
import axios from "axios"
import Table from '../components/Table'
import Pagination from '../components/Pagination'
import Filters from '../components/Filters'
import { ThemeContext } from '../context/ThemeContext'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

function TransactionsOverview() {

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate()

    const [data, setData] = useState({ maxPages: 0 })
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState(searchParams.get("sort") || "")
    const [order, setOrder] = useState(searchParams.get("order") || "asc")
    const [loading, setloading] = useState(true)
    const [status, setStatus] = useState(searchParams.get("status")?.toLowerCase() || "")
    const [search, setSearch] = useState("")
    const [schoolId, setSchoolId] = useState("")
    const {user} = useContext(ThemeContext)

    useEffect(()=>{
        console.log(user[0])
        if(!user[0]){
            return navigate("/login")
        }
    },[])
    useEffect(() => {
        
        setloading(true)
        axiosInstance.get("/transactions", {
            params: {
                page,
                limit,
                sort,
                order,
                status
            }
        })
            .then(res => {
                console.log(res.data)
                if (!res.data.success) {
                    navigate("/login", { replace: true })
                }
                setData(res.data)
                setloading(false)
                toast.success("All Transactions")
            })
            .catch(err => {
                console.log(err.message)
                toast.error(err.message)
                const { status } = err.response
                if (status != "200") {
                    navigate("/login", { replace: true })
                }

            })
    }, [page, sort, order, status])

    useEffect(() => {
        const params = {}
        params.page = page
        params.sort = sort
        params.order = order
        params.status = status
        setSearchParams(params, { replace: true })
    }, [page, sort, order, status])

    

    return (
        <div className="p-4 w-full h-screen bg-base-200 absolute top-14">
            <div className='flex pr-2 pl-2 h-full flex-col md:items-center md:justify-between gap-3 mb-4 '>


                <div className='flex items-center flex-col gap-4'>

                    
                    <Filters props={{setSearch,setStatus,status,setOrder,order,setSort,sort,search,setPage}} />

                    <Table transactions={data.transactions} loading={loading} page={{ page, limit }} />
                </div>
                <Pagination page={page} maxPages={parseInt(data.maxPages)} totalTransactions={data.totalTransactions} setPage={setPage} />
            </div>
        </div>

    )
}

export default TransactionsOverview
