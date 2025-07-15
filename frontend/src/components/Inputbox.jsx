export function InputBox({ label, placeholder, onChange }) {
  return (
    <div>
      <div className="text-sm font-medium text-left py-2 text-white">
        {label}
      </div>
      <input
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-3 py-2 border border-slate-300 rounded bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
