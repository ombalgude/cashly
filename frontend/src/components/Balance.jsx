export const Balance = ({ value }) => {
  return (
    <div className="flex items-center justify-between bg-gray-900 border border-gray-800 rounded-xl px-6 py-4 shadow-sm">
      <div className="text-blue-400 font-semibold text-lg">Your Balance</div>
      <div className="text-white font-bold text-2xl tracking-wide">₹ {value}</div>
    </div>
  );
};
