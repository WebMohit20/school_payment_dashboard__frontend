import { useState, useEffect } from 'react'
import { useSearchParams,useNavigate } from "react-router-dom"
import axios from "axios"
import Table from '../components/Table'
import Pagination from '../components/Pagination'

function TransactionsOverview() {

    const [searchParams, setSearchParams] = useSearchParams();

    const navigate = useNavigate()

    const [data, setData] = useState({maxPages:0})
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState(searchParams.get("sort") || "payment_time")
    const [order, setOrder] = useState(searchParams.get("order") || "asc")
    const [loading, setloading] = useState(true)
    const [status, setStatus] = useState(searchParams.get("status")?.toLowerCase() || "")
    const [search, setSearch] = useState("")
    const [schoolId,setSchoolId]  = useState("")

    useEffect(() => {
        setloading(true)
        axios.get("http://localhost:3000/api/v1/transactions", {
            withCredentials: true,
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
                if(!res.data.success){
                    navigate("/login",{replace:true})
                }
                setData(res.data)
                setloading(false)
            })
            .catch(err =>{
                 console.log(err.response)
                 const {status} = err.response
                 if(status!="200"){
                    navigate("/login",{replace:true})
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

    useEffect(()=>{
        if(schoolId){
            axios.get(`http://localohost:3000/api/v1/transaction/school/${schoolId}`,{
                withCredentials: true,
                params:{
                    page,
                    limit,
                    sort,
                    order,
                    status
                }
            })
            .then(res=>console.log(res))
            .catch(err=>console.error(err))
        }
    },[schoolId])
    
    return (
        <div className="p-4 h-screen absolute top-14">
            <div className='flex pr-2 pl-2 h-full flex-col md:items-center md:justify-between gap-3 mb-4 '>


                <div className='flex items-center flex-col gap-4'>

                    <div className="flex items-end gap-2">
                        <div className="form-control">
                            <div className="input-group">
                                <input
                                    type="text"
                                    placeholder="Search transactions..."
                                    className="input input-sm input-bordered w-60"
                                    value={search}
                                    onChange={(e) => {
                                        
                                        setSearch(e.target.value)
                                    }}
                                />
                                <button
                                    className="btn btn-primary btn-sm"
                                    onClick={() => {
                                        setPage(1)
                                        
                                        console.log("Search triggered for:", search)
                                    }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" role="img">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
                                        <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" fill="none" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <select
                            value={status}
                            onChange={(e) => {
                                setStatus(e.target.value);
                                setPage(1);
                            }}
                            className="select select-sm select-bordered w-40"
                        >
                            <option value="">All Status</option>
                            <option value="success">Success</option>
                            <option value="pending">Pending</option>
                            <option value="failed">Failed</option>
                        </select>


                        <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                                // setPendingSearch("");
                                setSearch("");
                                setStatus("");
                                setSort("payment_time");
                                setOrder("asc");
                                setPage(1);

                            }}
                        >
                            Reset
                        </button>
                    </div>


                    <Table transactions={data.transactions} loading={loading} page={{ page, limit }} />
                </div>
                <Pagination page={page} maxPages={parseInt(data.maxPages)} totalTransactions={data.totalTransactions} setPage={setPage} />
            </div>
        </div>

    )
}

export default TransactionsOverview
