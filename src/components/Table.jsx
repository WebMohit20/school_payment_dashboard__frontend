import React from 'react'

const Table = ( {transactions,loading,error = null ,page} ) => {
    return (
        <div id="transactions-table" className="overflow-none">
            <table className="table w-full table-pin-cols  bg-base-300">
                <thead className="sticky top-0 bg-base-100">
                    <tr>
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
                            <td colSpan={7 + 1} className="text-center py-8">
                                <div className="flex flex-col items-center gap-2">
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <span>Loading transactions...</span>
                                </div>
                            </td>
                        </tr>
                    ) : error ? (
                        <tr>
                            <td colSpan={7 + 1} className="text-center py-8 text-error">
                                {error}
                            </td>
                        </tr>
                    ) : transactions.length === 0 ? (
                        <tr>
                            <td colSpan={7 + 1} className="text-center py-8">
                                No transactions found.
                            </td>
                        </tr>
                    ) : (
                        transactions.map((row, idx) => (
                            <tr
                                key={row.collect_id ?? idx}
                                className="bg-base-300 transition-all duration-250 ease-in-out transform hover:-translate-y-1 hover:scale-[1.01] hover:shadow-lg hover:z-10 relative cursor-pointer"
                            >
                                {/* <td>{}</td> */}
                                <td>{(page.page - 1) * page.limit + idx + 1 }</td>
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
                                        {row.status.slice(0,1).toUpperCase()+row.status.slice(1) }
                                    </span>
                                </td>
                                <td>{`ODR-${row.collect_id.slice(row.collect_id.length-4)}`}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    )
}

export default Table
