import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function CheckStatusModal({ open }) {
  const [customOrderId, setCustomOrderId] = useState("");
  const [responseData, setResponseData] = useState(null);
  const [loading, setLoading] = useState(false);
  // const [open, setOpen] = useState(true);
  const [openModal,setOpenModal] = useState(open)
  const handleCheckStatus = async () => {
    if (!customOrderId.trim()) {
      toast.error("Please enter Custom Order ID");
      return;
    }

    setLoading(true);
    setResponseData(null);
    try {
      const { data } = await axios.get(`https://school-paymentanddashboardapplication.onrender.com/api/v1/transaction-status/${customOrderId}`, { withCredentials: true })
      // console.log(data);
      setResponseData(data);
      toast.success("Transaction status fetched successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch transaction status");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="">
      <button className="hidden md:flex btn btn-primary btn-sm text-sm" onClick={() => setOpenModal(true)}>
        Check Transaction Status
      </button>

      {openModal && (
        <div className="modal modal-open">
          <div className="modal-box w-[95%] max-w-lg">
            <h3 className="font-bold text-lg mb-4 text-center">Check Transaction Status</h3>

            {/* Input + Button (Responsive Layout) */}
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="text"
                placeholder="Enter Custom Order ID"
                className="input input-bordered w-full"
                value={customOrderId}
                onChange={(e) => setCustomOrderId(e.target.value)}
              />
              <button
                className={`btn btn-primary sm:w-auto w-full ${loading ? "loading" : ""}`}
                onClick={handleCheckStatus}
                disabled={loading}
              >
                {loading ? "Checking..." : "Check"}
              </button>
            </div>

            {/* Response Data */}
            {responseData && (
              <div className="mt-4 bg-base-200 p-4 rounded-lg text-sm">
                <p><b>Status:</b> {responseData.response?.status}</p>
                <p><b>Amount:</b> ₹{responseData.response?.amount}</p>
                <p><b>Transaction Amount:</b> ₹{responseData.response?.transaction_amount}</p>
                <p><b>Capture Status:</b> {responseData.response?.capture_status}</p>

                {/* Card Details */}
                {responseData.response?.details?.payment_methods?.card && (
                  <div className="mt-2 border-t pt-2 space-y-1">
                    <p><b>Card:</b> {responseData.response.details.payment_methods.card.card_number}</p>
                    <p><b>Bank:</b> {responseData.response.details.payment_methods.card.card_bank_name}</p>
                    <p><b>Network:</b> {responseData.response.details.payment_methods.card.card_network}</p>
                  </div>
                )}
              </div>
            )}

            <div className="modal-action">
              <button className="btn w-full sm:w-auto" onClick={() => setOpenModal(false)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckStatusModal