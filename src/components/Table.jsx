import React from 'react'

const Table = ( {transactions,loading,error = null} ) => {
    return (
        <div id="transactions-table" className="overflow-x-auto border rounded-lg">
            <table className="table w-full table-compact">
                <thead className="bg-base-200 sticky top-0">
                    <tr>
                        {/* optional Sr no column */}
                        <th className="w-12">Sr.No.</th>
                        <th>Collect_id</th>
                        <th>School_id</th>
                        <th>Gateway</th>
                        <th>Order_amount</th>
                        <th>Transaction_amount</th>
                        <th>Status</th>
                        <th>Custom_order_id</th>
                    </tr>
                </thead>

                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-8">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <span>Loading transactions...</span>
                                </div>
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-8 text-error">
                                {error}
                            </td>
                        </tr>
                    ) : transactions.length === 0 ? (
                        <tr>
                            <td colSpan={columns.length + 1} className="text-center py-8">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((row, idx) => (
                            <tr
                                key={row.collect_id ?? idx}
                                className="transition-all duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg hover:z-10 relative"
                            >
                                {/* <td>{(page - 1) * limit + idx + 1}</td> */}
                                <td>{idx+1}</td>
                                <td>{row.collect_id}</td>
                                <td>{row.order_info.school_id}</td>
                                <td>{row.order_info.gateway_name}</td>
                                <td>₹{Number(row.order_amount ?? 0).toLocaleString()}</td>
                                <td>₹{Number(row.transaction_amount ?? 0).toLocaleString()}</td>
                                <td>
                                    <span
                                        className={
                                            " " +
                                            (row.status === "success"
                                                ? "text-green-500"
                                                : row.status === "pending"
                                                    ? "text-warning"
                                                    : "text-error")
                                        }
                                    >
                                        {row.status.slice(0,1).toUpperCase()+row.status.slice(1) ?? "-"}
                                    </span>
                                </td>
                                <td>{`ORD-${row.collect_id.slice(row.collect_id.length-4)}`}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
