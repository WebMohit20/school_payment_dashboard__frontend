import React from 'react'
import { ArrowDownWideNarrow,ArrowDownNarrowWide } from 'lucide-react'
function Filters( {props} ) {
    const {setSearch,setStatus,status,setOrder,order,setSort,sort,search,setPage} = props
    return (
        <div>
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
                    value={sort}
                    onChange={(e) => {
                        setSort(e.target.value);
                        setPage(1);
                    }}
                    className="select select-sm select-bordered w-40"
                >
                    <option value="">--Sort By--</option>
                    <option value="payment_time">Payment Time</option>
                    <option value="status">Status</option>
                    <option value="transaction_amount">Transaction Amount</option>
                </select>

                <select
                    value={order}
                    onChange={(e) => {
                        setOrder(e.target.value);
                        setPage(1);
                    }}
                    className="select select-sm select-bordered w-40"
                >

                    <option value="asc">Ascending</option>
                    <option value="desc"> Descending</option>
                </select>
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
                        setSort("");
                        setOrder("asc");
                        setPage(1);

                    }}
                >
                    Reset
                </button>
            </div>
        </div>
    )
}

export default Filters
