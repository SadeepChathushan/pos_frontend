import React from "react";

const BlueInput = ({ label, value, onChange, placeholder, type = "text" }) => {
  return (
    <div className="mb-2 w-full">
      {label && <label className="block mb-1 text-sm text-deepblue font-medium">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full border border-blue-500 bg-blue-50 text-deepblue rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
};

export default BlueInput;
