import React, { useEffect, useState } from "react";
import { FiPlus, FiX } from "react-icons/fi";

// ✅ Add `onSubmit` to props
export default function AddOrderModal({ onClose, onSubmit }) {
  const [success, setSuccess] = useState(false);
  const [items, setItems] = useState([{ item: "", price: "", quantity: "" }]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmitOrder = () => {
    const newOrder = {
      id: `P${Math.floor(Math.random() * 1000).toString().padStart(2, "0")}`,
      date: new Date().toISOString().split("T")[0],
      name: "Ms. Lakshi",
      amount: items.reduce(
        (sum, i) => sum + (parseFloat(i.price || 0) * parseInt(i.quantity || 0)),
        0
      ),
      paid: false
    };

    onSubmit(newOrder); // ✅ Call passed function
    setSuccess(true);

    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };

  const addItemRow = () => {
    setItems([...items, { item: "", price: "", quantity: "" }]);
  };

  const handleItemChange = (index, field, value) => {
    const updated = [...items];
    updated[index][field] = value;
    setItems(updated);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="relative bg-white w-full max-w-2xl h-[90vh] rounded-lg shadow-lg flex flex-col overflow-hidden">
        {/* ❌ Close */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white bg-[#21414d] hover:bg-red-600 rounded-full p-1 transition"
          title="Close"
        >
          <FiX className="w-5 h-5" />
        </button>

        {/* 🧾 Header */}
        <div className="bg-[#8DA1AF] text-black px-6 py-3 rounded-t-lg text-center text-xl font-bold">
          Add Order
        </div>

        {/* 📋 Scrollable Form */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {/* These inputs are decorative for now */}
          <div>
            <label className="block mb-1 font-medium">Date :</label>
            <input type="date" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Name :</label>
            <input type="text" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount :</label>
            <input type="number" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Batch ID(Date) :</label>
            <input type="Date" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>
          <div>
            <label className="block mb-1 font-medium">Status :</label>
            <input type="Boolean" className="w-full p-2 bg-[#BED0DB] rounded" />
          </div>


          {/* Items Table */}
          <div className="mt-4">
            <div className="grid grid-cols-3 bg-[#1C3F50] text-white font-semibold px-4 py-2 rounded-t">
              <span>Item</span>
              <span className="text-right">Unit Price</span>
              <span className="text-right">Quantity</span>
            </div>

            {items.map((row, index) => (
              <div
                key={index}
                className="grid grid-cols-3 items-center border-b px-4 py-2 gap-2"
              >
                <select
                  className="border rounded p-1 bg-white"
                  value={row.item}
                  onChange={(e) =>
                    handleItemChange(index, "item", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option value="Alariya Sahal">Alariya Sahal</option>
                  <option value="Atlas Pen">Atlas Pen</option>
                </select>

                <input
                  type="text"
                  className="text-right border-2 hover:border-[#1C3F50] p-1 rounded"
                  value={row.price}
                  onChange={(e) =>
                    handleItemChange(index, "price", e.target.value)
                  }
                />

                <input
                  type="number"
                  className="text-right border-2 hover:border-[#1C3F50] p-1 rounded"
                  value={row.quantity}
                  onChange={(e) =>
                    handleItemChange(index, "quantity", e.target.value)
                  }
                />
              </div>
            ))}

            {/* ➕ Add Row */}
            <div className="text-right mt-2">
              <button
                onClick={addItemRow}
                className="text-[#1C3F50] hover:text-[#0d2c3b] font-bold text-lg"
                title="Add Row"
              >
                <FiPlus className="inline-block w-6 h-6" />
              </button>
            </div>
          </div>

          {/* ✅ Success */}
          {success && (
            <div className="text-green-600 font-semibold text-center border border-green-300 bg-green-50 p-2 rounded">
              Order submitted successfully!
            </div>
          )}
        </div>

        {/* ✅ Submit */}
        <div className="px-6 py-4 border-t bg-white text-center">
          <button
            onClick={handleSubmitOrder}
            className="bg-[#DD9F52] text-white px-6 py-2 rounded-lg hover:bg-orange-500 transition"
          >
            Submit Order
          </button>
        </div>
      </div>
    </div>
  );
}
