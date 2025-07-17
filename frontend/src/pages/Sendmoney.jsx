import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { Button } from "../components/Button";
import { InputBox } from "../components/Inputbox";
import { Heading } from "../components/Heading";
import { SubHeading } from "../components/Subheading";
import { useNavigate } from "react-router-dom";
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
          amount: Number(amount), // Make sure to convert amount to a number
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
    <div className="bg-gray-800 h-screen flex justify-center items-center">
      <div className="bg-white rounded-lg w-96 text-center p-8 shadow-md">
        <Heading label={"Send Money"} />
        <div className="flex items-center space-x-4 pt-8">
          <div className="rounded-full bg-green-500 w-12 h-12 flex items-center justify-center text-white text-xl">
            {name[0].toUpperCase()}
          </div>
          <SubHeading label={name} />
        </div>
        <InputBox
          label={"Amount (in Rs)"}
          placeholder={"Enter amount"}
          type="number"
          onChange={(e) => setAmount(e.target.value)}
        />
        <Button label={"Send"} onClick={handleSend} />
      </div>
    </div>
  );
};
