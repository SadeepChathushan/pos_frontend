import React, { useState } from "react";
import { Calculator as CalcIcon, X } from "lucide-react";

const FloatingCalculator = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleClick = (val) => {
    if (val === "C") return setInput("");
    if (val === "=") {
      try {
        // eslint-disable-next-line no-eval
        setInput(eval(input).toString());
      } catch {
        setInput("Error");
      }
      return;
    }
    setInput((prev) => prev + val);
  };

  const buttons = [
    "7", "8", "9", "/",
    "4", "5", "6", "*",
    "1", "2", "3", "-",
    "0", ".", "=", "+",
    "C",
  ];

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-6 right-6 z-50 bg-palette-orange text-white p-3 rounded-full shadow-lg hover:bg-orange-500 transition"
        title="Toggle Calculator"
      >
        {open ? <X size={24} /> : <CalcIcon size={24} />}
      </button>

      {/* Calculator Panel */}
      {open && (
        <div className="fixed bottom-20 right-6 w-72 bg-white shadow-xl rounded-lg border z-50">
          <div className="p-4">
            <h2 className="text-lg font-bold text-palette-deepblue mb-4 text-center flex items-center justify-center gap-2">
              <CalcIcon size={20} className="text-palette-orange" />
              Quick Calculator
            </h2>
            <input
              type="text"
              value={input}
              className="w-full border p-2 rounded text-right font-mono text-xl mb-4"
              readOnly
            />
            <div className="grid grid-cols-4 gap-2">
              {buttons.map((btn) => (
                <button
                  key={btn}
                  onClick={() => handleClick(btn)}
                  className={`p-3 rounded font-semibold text-lg ${
                    btn === "="
                      ? "bg-palette-orange text-white"
                      : btn === "C"
                      ? "bg-red-100 text-red-600"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                >
                  {btn}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingCalculator;
