import { useState } from "react";
import { BottomWarning } from "../components/Bottomwarning";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/Inputbox";
import { SubHeading } from "../components/Subheading";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    try {
      if (!firstname || !lastname || !username || !password) {
        alert("Please fill all fields");
        return;
      }

      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        username,
        firstname,
        lastname,
        password,
      });

      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err?.response?.data?.message || "Signup failed. Try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-950 via-black to-gray-900 text-white">
      <div className="bg-gray-900 bg-opacity-80 backdrop-blur-xl rounded-2xl shadow-2xl p-10 w-full max-w-md">
        <div className="text-center mb-6">
          <Heading label="Create Your Account" />
          <SubHeading label="Join Cashly and move money smarter." />
        </div>
        <div className="space-y-4">
          <InputBox onChange={(e) => setFirstName(e.target.value)} placeholder="John" label="First Name" />
          <InputBox onChange={(e) => setLastName(e.target.value)} placeholder="Doe" label="Last Name" />
          <InputBox onChange={(e) => setUsername(e.target.value)} placeholder="johndoe@gmail.com" label="Email" />
          <InputBox onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" label="Password" />
        </div>
        <div className="pt-6">
          <Button onClick={handleSignup} label="Sign Up" />
        </div>
        <div className="pt-4">
          <BottomWarning label="Already have an account?" buttonText="Sign in" to="/signin" />
        </div>
      </div>
    </div>
  );
};
