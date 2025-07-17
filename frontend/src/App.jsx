import {BrowserRouter, Routes, Route} from "react-router-dom"
import { Signup } from "./pages/Signup"
import { Signin } from "./pages/Signin"
import { Dashboard } from "./pages/Dashboard"
import { SendMoney } from "./pages/Sendmoney"
import LandingPage from "./pages/Landing"
import { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
      <BrowserRouter>
      <Toaster position="top-center" />
        <Routes>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/send" element={<SendMoney/>} />
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}

export default App
