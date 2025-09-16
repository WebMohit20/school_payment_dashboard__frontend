import { useState, useEffect } from 'react'
import { useSearchParams } from "react-router-dom"
import axios from "axios"
import Table from '../components/Table'
import Pagination from '../components/Pagination'

function TransactionsOverview() {

    const [searchParams, setSearchParams] = useSearchParams();


    const [data, setData] = useState({})
    const [page, setPage] = useState(Number(searchParams.get("page")) || 1)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState(searchParams.get("sort") || "payment_time")
    const [order, setOrder] = useState(searchParams.get("order") || "asc")
    const [loading, setloading] = useState(true)
    const [status, setStatus] = useState(searchParams.get("status").toLowerCase() || "")

    useEffect(() => {
        setloading(true)
        axios.get("http://localhost:3000/api/v1/transactions", {
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
                setData(res.data)
                setloading(false)
            })
            .catch(err => console.log(err))
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
        <div className="p-4 h-screen ">
            <div className='flex pr-2 pl-2 h-full flex-col md:items-center md:justify-between gap-3 mb-4 '>

                {/* right: filters */}
                <div className='flex items-center flex-col gap-4'>
                    <div className="flex items-end gap-2">
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
                            <option value="fail">Failed</option>
                        </select>

                        {/* optional: reset filters */}
                        <button
                            className="btn btn-sm btn-ghost"
                            onClick={() => {
                                // setPendingSearch("");
                                // setSearch("");
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
