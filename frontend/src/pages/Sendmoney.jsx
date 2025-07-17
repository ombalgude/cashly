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
      )

      alert("Transfer successful");
      
      navigate("/dashboard");
    } catch (error) {
      alert(error?.response?.data?.message || "Transfer failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-8 space-y-6">
        <Heading label="Send Money" />

        <div className="flex items-center gap-4 pt-4">
          <div className="w-14 h-14 rounded-full bg-green-600 text-white flex items-center justify-center text-2xl font-semibold">
            {name?.[0]?.toUpperCase()}
          </div>
          <div>
            <SubHeading label={name} />
            <p className="text-sm text-gray-500">Recipient</p>
          </div>
        </div>

        <div className="pt-4">
          <InputBox
            label="Amount (in ₹)"
            placeholder="Enter amount"
            type="number"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="pt-4">
          <Button label="Send" onClick={handleSend} />
        </div>
      </div>
    </div>
  );
};
