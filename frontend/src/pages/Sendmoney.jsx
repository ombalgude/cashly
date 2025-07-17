import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import BACKEND_URL from "../../config";
import toast from "react-hot-toast";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const [amount, setAmount] = useState<number | string>("");
  const [balance, setBalance] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchBalance = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      });
      setBalance(res.data.balance);
    } catch (err) {
      console.error("Failed to fetch balance", err);
      toast.error("Failed to load balance.");
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  const handleTransfer = async () => {
    const amt = Number(amount);

    if (!amt || amt <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: amt,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      toast.success(`₹${amt} transferred successfully to ${name}`);
      setAmount("");
      fetchBalance(); // Refresh balance after transfer
    } catch (err) {
      toast.error("Transfer failed. Please try again.");
      console.error("Transfer error", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6 space-y-4">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name ? name[0].toUpperCase() : ""}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>

            <div className="text-md text-gray-600">
              Current Balance:{" "}
              <span className="font-bold text-black">
                ₹{balance !== null ? balance : "Loading..."}
              </span>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="amount"
                className="text-sm font-medium leading-none"
              >
                Amount (in Rs)
              </label>
              <input
                value={amount}
                onChange={(e) => {
                  setAmount(e.target.value);
                }}
                type="number"
                min="1"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
              />
            </div>

            <button
              onClick={handleTransfer}
              disabled={loading}
              className={`justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600 text-white"
              }`}
            >
              {loading ? "Transferring..." : "Initiate Transfer"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
