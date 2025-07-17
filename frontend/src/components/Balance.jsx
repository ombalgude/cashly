import { useEffect, useState } from "react";
import axios from "axios";
import BACKEND_URL from "../../config";

export const Balance = () => {
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${BACKEND_URL}/api/v1/account/balance`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAmount(response.data.balance);
      } catch (error) {
        console.error("Failed to fetch balance:", error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 shadow-sm">
      <div className="text-blue-400 font-semibold text-lg">Your Balance</div>
      <div className="text-white font-bold text-2xl tracking-wide">₹ {amount}</div>
    </div>
  );
};



/////////

// export const Balance = ({ value }) => {
//   return (
//     <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 shadow-sm">
//       <div className="text-blue-400 font-semibold text-lg">Your Balance</div>
//       <div className="text-white font-bold text-2xl tracking-wide">₹ {value}</div>
//     </div>
//   );
// };