import { useState, useEffect } from 'react'
import { useSearchParams, useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import Filters from '../components/Filters'
import Table from '../components/Table'
import Pagination from '../components/Pagination'


function TransactionsBySchool() {
    const [searchParams, setSearchParams] = useSearchParams();
    const { schoolId } = useParams()
    const navigate = useNavigate()

    const [data, setData] = useState({ maxPages: 0 })
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState(searchParams.get("sort") || "payment_time")
    const [order, setOrder] = useState(searchParams.get("order") || "asc")
    const [loading, setloading] = useState(true)
    const [status, setStatus] = useState(searchParams.get("status")?.toLowerCase() || "")
    const [search, setSearch] = useState("")
    // const [schoolId, setSchoolId] = useState("")


    useEffect(() => {
        setloading(true)
        axios.get(`http://localhost:3000/api/v1/transactions/school/${schoolId}`, {
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
                if (!res.data.success) {
                    navigate("/login", { replace: true })
                }
                setData(res.data)
                setloading(false)
            })
            .catch(err => {
                console.log(err.response)
                const { status } = err.response
                if (status != "200") {
                    navigate("/login", { replace: true })
                }

            })
    }, [page, sort, order, status])

    useEffect(() => {
        console.log(schoolId)
        const params = {}
        params.page = page
        params.sort = sort
        params.order = order
        params.status = status
        setSearchParams(params, { replace: true })
    }, [page, sort, order, status, schoolId])
    return (
        <div className='p-4 w-full h-screen bg-base-200 absolute top-14'>
            <div className='flex pr-2 pl-2 h-full flex-col md:items-center md:justify-between gap-3 mb-4'>
                <div className='flex items-center flex-col gap-4'>
                    <Filters props={{setSearch,setStatus,status,setOrder,order,setSort,sort,search,setPage}} />
                    <Table transactions={data.transactions} loading={loading} page={{ page, limit }} />
                </div>
                <Pagination page={page} maxPages={parseInt(data.maxPages)} totalTransactions={data.totalTransactions} setPage={setPage} />
            </div>
        </div>
    )
}

export default TransactionsBySchool
