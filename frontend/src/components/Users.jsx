import { useEffect, useState } from "react";
import { Button } from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BACKEND_URL from "../../config";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    axios
      .get(`${BACKEND_URL}/api/v1/user/bulk?filter=${filter}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data.user);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, [filter]);

  return (
    <div className="mt-8 px-4">
      <h2 className="text-2xl font-semibold text-blue-400 mb-4">Users</h2>
      <div className="mb-4">
        <input
          onChange={(e) => setFilter(e.target.value)}
          type="text"
          placeholder="Search users..."
          className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="space-y-4">
        {users.map((user) => (
          <User key={user._id} user={user} />
        ))}
      </div>
    </div>
  );
};

function User({ user }) {
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center p-4 bg-gray-900 rounded-xl border border-gray-800 shadow-sm hover:border-blue-600 transition-all">
      <div className="flex items-center space-x-4">
        <div className="rounded-full h-12 w-12 bg-blue-600 text-white flex items-center justify-center font-bold text-lg">
          {user.firstName[0]}
        </div>
        <div className="text-white font-medium">
          {user.firstName} {user.lastName}
        </div>
      </div>
      <Button
        onClick={() => navigate(`/send?id=${user._id}&name=${user.firstName}`)}
        label="Send Money"
        className="text-sm px-4 py-2"
      />
    </div>
  );
}
