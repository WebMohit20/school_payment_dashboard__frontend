import React from 'react'



const Pagination = ({ page, maxPages, totalTransactions, setPage }) => {
    
    return (
        <div className="flex items-center justify-between gap-2 mt-4">
            <div>
                <p className="text-sm">
                    Showing page <strong>{page}</strong> of <strong>{parseInt(maxPages)}</strong> — <strong>{totalTransactions}</strong> total
                    transactions
                </p>
            </div>

            <div className="btn-group">
                <button
                    className="btn btn-sm"
                    disabled={page <= 1}
                    onClick={() => setPage(page=>page - 1)}
                >
                    « Prev
                </button>
                <button
                    className="btn btn-sm"
                    disabled={page >= maxPages}
                    onClick={() => setPage(page=>page + 1)}
                >
                    Next »
                </button>
            </div>
        </div>
    )
}

export default Pagination
