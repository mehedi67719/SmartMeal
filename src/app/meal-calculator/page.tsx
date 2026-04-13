"use client";

import { Costentry } from "@/server/CostEntry/cost";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaCalendarAlt, FaTag, FaBoxOpen, FaWeightHanging, FaMoneyBillWave, FaCalculator, FaStickyNote, FaUser, FaPlus, FaTrash, FaShoppingCart, FaSave, FaList, FaWallet, FaTimes } from "react-icons/fa";


interface Item {
  id: number;
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

interface FormData {
  date: string;
  category: string;
  note: string;
  buyer: string;
  items: Item[];
}

const Page = () => {
  const { data: session } = useSession();
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertType, setAlertType] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    category: "",
    note: "",
    buyer: "",
    items: [
      {
        id: Date.now(),
        itemName: "",
        quantity: "",
        unitPrice: "",
        totalPrice: "",
      }
    ],
  });

  const categories = [
    { value: "vegetables", label: "🥦 Vegetables", icon: "🥦" },
    { value: "fish", label: "🐟 Fish", icon: "🐟" },
    { value: "meat", label: "🍗 Meat", icon: "🍗" },
    { value: "dairy-eggs", label: "🥚 Dairy & Eggs", icon: "🥚" },
    { value: "groceries", label: "🍚 Groceries", icon: "🍚" },
    { value: "bakery", label: "🍞 Bakery", icon: "🍞" },
    { value: "spices", label: "🧂 Spices & Condiments", icon: "🧂" },
    { value: "beverages", label: "🥤 Beverages", icon: "🥤" },
    { value: "fruits", label: "🍎 Fruits", icon: "🍎" },
    { value: "household", label: "🧼 Household Items", icon: "🧼" },
    { value: "cleaning", label: "🧻 Cleaning Supplies", icon: "🧻" },
    { value: "medicine", label: "💊 Medicine", icon: "💊" },
    { value: "transport", label: "🚗 Transport", icon: "🚗" },
    { value: "dining", label: "🍽️ Dining / Outside Food", icon: "🍽️" },
    { value: "others", label: "🛒 Others", icon: "🛒" },
  ];

  const addItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id: Date.now(),
          itemName: "",
          quantity: "",
          unitPrice: "",
          totalPrice: "",
        },
      ],
    }));
  };

  const removeItem = (id: number) => {
    if (formData.items.length > 1) {
      setFormData((prev) => ({
        ...prev,
        items: prev.items.filter((item) => item.id !== id),
      }));
    }
  };

  const updateItem = (id: number, field: keyof Item, value: string) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value };
          if (field === "quantity" || field === "unitPrice") {
            const quantity = field === "quantity" ? value : item.quantity;
            const unitPrice = field === "unitPrice" ? value : item.unitPrice;
            const total = (parseFloat(quantity) || 0) * (parseFloat(unitPrice) || 0);
            updatedItem.totalPrice = total.toString();
          }
          return updatedItem;
        }
        return item;
      }),
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateGrandTotal = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.totalPrice) || 0), 0);
  };

  const resetForm = () => {
    setFormData({
      date: new Date().toISOString().split("T")[0],
      category: "",
      note: "",
      buyer: "",
      items: [
        {
          id: Date.now(),
          itemName: "",
          quantity: "",
          unitPrice: "",
          totalPrice: "",
        }
      ],
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!session?.user?.email) {
      setAlertMessage("Please login to save entry");
      setAlertType("error");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    setLoading(true);

    try {
      const grandTotal = calculateGrandTotal();

      const costdata = {
        date: formData.date,
        Manageremail: session?.user?.email,
        category: formData.category,
        buyer: formData.buyer || "Unknown",
        note: formData.note,
        items: formData.items.map(item => ({
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        })),
        grandTotal: grandTotal
      };

      const result = await Costentry(costdata);

      if (result && result.success) {
        setAlertMessage("Entry saved successfully!");
        setAlertType("success");
        setShowAlert(true);
        
        resetForm();
        setIsModalOpen(false);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      } else {
        setAlertMessage(result?.error || "Failed to save entry. Please try again.");
        setAlertType("error");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      setAlertMessage("An error occurred. Please try again.");
      setAlertType("error");
      setShowAlert(true);

      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = calculateGrandTotal();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl my-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        {showAlert && (
          <div className={`fixed top-20 right-4 z-50 animate-slide-in ${alertType === "success" ? "bg-green-500" : "bg-red-500"} text-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-2`}>
            {alertType === "success" ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
            {alertMessage}
          </div>
        )}

        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaShoppingCart className="text-4xl text-green-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Bazar Entry
            </h2>
          </div>
          <p className="text-gray-500">Manage multiple items in one entry</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
              <h3 className="text-xl font-bold text-gray-800">Add New Entry</h3>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-xl flex items-center gap-2 transition-all duration-200"
            >
              <FaPlus />
              Open Form
            </button>
          </div>

          {isModalOpen && (
            <>
              <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsModalOpen(false)} />
              <div className="fixed inset-0 z-50 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4">
                  <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                    <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center rounded-t-2xl">
                      <h3 className="text-xl font-bold text-gray-800">Add New Bazar Entry</h3>
                      <button
                        onClick={() => setIsModalOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-full"
                      >
                        <FaTimes className="w-5 h-5" />
                      </button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaCalendarAlt className="text-green-600 text-xs" />
                            Date <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaTag className="text-green-600 text-xs" />
                            Category <span className="text-red-500">*</span>
                          </label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          >
                            <option value="">Select category</option>
                            {categories.map((cat) => (
                              <option key={cat.value} value={cat.value}>
                                {cat.label}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaUser className="text-green-600 text-xs" />
                            Buyer
                          </label>
                          <input
                            type="text"
                            name="buyer"
                            value={formData.buyer}
                            onChange={handleChange}
                            placeholder="e.g., Mehedi"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                            <FaStickyNote className="text-green-600 text-xs" />
                            Note
                          </label>
                          <input
                            type="text"
                            name="note"
                            value={formData.note}
                            onChange={handleChange}
                            placeholder="Additional notes"
                            className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center gap-2">
                            <FaList className="text-green-600" />
                            <h4 className="font-semibold text-gray-800">Items List</h4>
                          </div>
                          <button
                            type="button"
                            onClick={addItem}
                            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all duration-200 text-sm"
                          >
                            <FaPlus />
                            Add Item
                          </button>
                        </div>

                        <div className="space-y-3">
                          {formData.items.map((item, index) => (
                            <div key={item.id} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
                                <div className="lg:col-span-1">
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Item Name <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={item.itemName}
                                    onChange={(e) => updateItem(item.id, "itemName", e.target.value)}
                                    required
                                    placeholder="e.g., Potato, Onion, Rice"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Quantity <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="text"
                                    value={item.quantity}
                                    onChange={(e) => updateItem(item.id, "quantity", e.target.value)}
                                    required
                                    placeholder="e.g., 2 kg, 12 pcs"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Unit Price (Tk) <span className="text-red-500">*</span>
                                  </label>
                                  <input
                                    type="number"
                                    value={item.unitPrice}
                                    onChange={(e) => updateItem(item.id, "unitPrice", e.target.value)}
                                    required
                                    placeholder="Per unit price"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                                  />
                                </div>
                                <div>
                                  <label className="block text-xs font-semibold text-gray-600 mb-1">
                                    Total (Tk)
                                  </label>
                                  <input
                                    type="text"
                                    value={item.totalPrice}
                                    readOnly
                                    className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-green-50 text-green-700 font-semibold text-sm"
                                  />
                                </div>
                                <div className="flex items-end">
                                  <button
                                    type="button"
                                    onClick={() => removeItem(item.id)}
                                    className="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-all duration-200"
                                  >
                                    <FaTrash />
                                  </button>
                                </div>
                              </div>
                              {index === formData.items.length - 1 && formData.items.length > 1 && (
                                <div className="text-xs text-gray-400 mt-2 text-right">
                                  Item {index + 1} of {formData.items.length}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-6 border border-green-200">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <FaWallet className="text-green-600 text-xl" />
                            <span className="font-semibold text-gray-700">Grand Total:</span>
                          </div>
                          <div className="text-2xl font-bold text-green-600">
                            Tk{grandTotal.toFixed(2)}
                          </div>
                        </div>
                        <div className="text-xs text-gray-500 mt-2 text-right">
                          Total {formData.items.length} item(s)
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-semibold"
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          disabled={loading}
                          className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loading ? (
                            <>
                              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Saving...
                            </>
                          ) : (
                            <>
                              <FaSave />
                              Save Entry
                            </>
                          )}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Page;