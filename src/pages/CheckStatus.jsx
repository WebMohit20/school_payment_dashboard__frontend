import { useState } from "react";
import { toast } from "react-hot-toast";

function CheckStatus() {
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card bg-base-100 shadow-xl w-full max-w-md">
                <div className="card-body">
                    <h2 className="text-2xl font-bold text-center">Check Transaction Status</h2>

                    <form onSubmit={handleCheckStatus} className="space-y-4 mt-4">
                        <input
                            type="text"
                            placeholder="Enter Transaction ID"
                            value={txnId}
                            onChange={(e) => setTxnId(e.target.value)}
                            className="input input-bordered w-full"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn btn-primary w-full"
                        >
                            {loading ? "Checking..." : "Check Status"}
                        </button>
                    </form>

                    {/* Result Section */}
                    {result && (
                        <div className="mt-6 p-4 rounded-lg bg-base-200">
                            <h3 className="font-semibold text-lg">Result</h3>
                            <pre className="text-sm overflow-x-auto">{JSON.stringify(result, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default CheckStatus
