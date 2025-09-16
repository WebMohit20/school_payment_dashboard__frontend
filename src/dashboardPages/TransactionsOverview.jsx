import { useState, useEffect } from 'react'
import axios from "axios"
import Table from '../components/Table'
import Pagination from '../components/Pagination'

function TransactionsOverview() {

    const [data, setData] = useState({transactions:[],maxPages:1,totalTransactions:0})
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [sort, setSort] = useState("payment_time")
    const [order, setOrder] = useState("asc")
    const [loading,setloading] = useState(true)
    
    useEffect(() => {
        setloading(true)
        axios.get("http://localhost:3000/api/v1/transactions", {
            params: {
                page,
                limit,
                sort,
                order
            }
        })
            .then(res => {
                console.log(res.data.maxPages)
                setData({"transactions":res.data.data,"maxPages":res.data.maxPages,"totalTransactions":res.data.totalTransactions})
                setloading(false)
            })
            .catch(err => console.log(err))
    }, [page, sort, order])

    if(loading){
        return (<div className="loading loading-spinner loading-lg mt-4">loader</div>)
    }
    return (
        <div className="">
            
            <select onChange={(e) => setSort(e.target.value)}>
                <option value={"payment_time"}> Payment Time </option>
                <option value={"status"}> Status </option>
                <option value={"transaction_amount"}> Transaction Amount </option>
            </select>

            <button className="btn btn-base mt-4" onClick={() => setOrder(order => order === "asc" ? "desc" : "asc")}>Order</button>
                
            <Table  transactions={data.transactions} loading={loading}/>
            <Pagination page={page} maxPages={parseInt(data.maxPages)} totalTransactions={data.totalTransactions} setPage={setPage} />

        </div>
    )
}

export default TransactionsOverview
