import { useState } from "react";
import { BottomWarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../config";

export const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignin = async () => {
    try {
      if (!username || !password) {
        alert("Please enter both email and password");
        return;
      }

      const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, {
        username,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signin failed:", err);
      alert(err?.response?.data?.message || "Signin failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-gray-900 text-white">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 md:p-10 w-11/12 md:w-full max-w-md">
        <div className="text-center mb-6">
          <Heading label="Welcome Back" />
          <SubHeading label="Enter your credentials to access your account" />
        </div>
        <div className="space-y-4">
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="abc@gmail.com"
            label="Email"
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            label="Password"
          />
        </div>
        <div className="pt-6">
          <Button onClick={handleSignin} label="Sign In" />
        </div>
        <div className="pt-4">
          <BottomWarning
            label="Don't have an account?"
            buttonText="Sign up"
            to="/signup"
          />
        </div>
      </div>
    </div>
  );
};
