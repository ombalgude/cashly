import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import { Users } from "../components/Users";

export const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-950 via-black to-gray-900 text-white">
      <Appbar />
      <div className="px-6 md:px-20 py-10 w-full max-w-6xl mx-auto space-y-10">
        <Balance value={"10,000"} />
        <Users />
      </div>
    </div>
  );
};
