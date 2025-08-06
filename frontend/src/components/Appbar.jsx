import { useEffect, useState } from "react";

export const Appbar = () => {
  const [initial, setInitial] = useState("U");

  useEffect(() => {
    const firstname = localStorage.getItem("firstname");
    if (firstname) {
      const firstLetter = firstname.charAt(0).toUpperCase();
      setInitial(firstLetter);
    }
  }, []);

  return (
    <div className="bg-black bg-opacity-80 backdrop-blur-md shadow-md h-16 px-6 flex justify-between items-center text-white">
      <div className="text-2xl font-bold tracking-wide text-blue-400">Cashly</div>

      <div className="flex items-center space-x-4">
        <span className="hidden sm:inline text-base font-medium text-gray-300">Hello</span>
        <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold text-lg shadow-md">
          {initial}
        </div>
      </div>
    </div>
  );
};
