import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { InputBox } from "../components/Inputbox";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import BACKEND_URL from "../../config";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  const name = searchParams.get("name");

  const [amount, setAmount] = useState("");
  const navigate = useNavigate();

  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `${BACKEND_URL}/api/v1/account/transfer`,
        {
          to: id,
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Transfer successful");
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4">
      <div className="bg-gray-900 border border-gray-700 rounded-2xl shadow-md w-full max-w-md p-8 space-y-6 text-white">
        <h2 className="text-3xl font-bold text-blue-400 text-center">Send Money</h2>

        <div className="flex items-center gap-4 pt-2">
          <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-xl font-semibold uppercase">
            {name?.[0]}
          </div>
          <div>
            <div className="text-lg font-medium text-white">{name}</div>
            <div className="text-sm text-gray-400">Recipient</div>
          </div>
        </div>

        <div className="pt-2">
          <InputBox
            label="Amount (in ₹)"
            placeholder="Enter amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="pt-2">
          <Button
            label="Send"
            onClick={handleSend}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
          />
        </div>
      </div>
    </div>
  );
};
