"use client";

import { Costentry } from "@/server/Cost/cost";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCalendarAlt, FaTag, FaUser, FaPlus, FaTrash, FaShoppingCart, FaSave, FaList, FaWallet, FaStickyNote, FaCalendar } from "react-icons/fa";

interface Item {
  id: number;
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
}

interface FormData {
  date: string;
  month: string;
  category: string;
  note: string;
  buyer: string;
  items: Item[];
}

interface CustomSessionUser {
  id?: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  secretCode?: string;
  accountType?: string;
  messName?: string;
}

const Page = () => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [isSessionReady, setIsSessionReady] = useState(false);


  console.log(session)

  const getCurrentMonth = () => {
    const date = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return `${monthNames[date.getMonth()]}-${date.getFullYear()}`;
  };

  const [formData, setFormData] = useState<FormData>({
    date: new Date().toISOString().split("T")[0],
    month: getCurrentMonth(),
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
    { value: "vegetables", label: "🥦 Vegetables" },
    { value: "fish", label: "🐟 Fish" },
    { value: "meat", label: "🍗 Meat" },
    { value: "dairy-eggs", label: "🥚 Dairy & Eggs" },
    { value: "groceries", label: "🍚 Groceries" },
    { value: "bakery", label: "🍞 Bakery" },
    { value: "spices", label: "🧂 Spices & Condiments" },
    { value: "beverages", label: "🥤 Beverages" },
    { value: "fruits", label: "🍎 Fruits" },
    { value: "household", label: "🧼 Household Items" },
    { value: "cleaning", label: "🧻 Cleaning Supplies" },
    { value: "medicine", label: "💊 Medicine" },
    { value: "transport", label: "🚗 Transport" },
    { value: "dining", label: "🍽️ Dining / Outside Food" },
    { value: "others", label: "🛒 Others" },
  ];

  const monthOptions = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currentYear = new Date().getFullYear();
  const years = [currentYear - 1, currentYear, currentYear + 1];

  React.useEffect(() => {
    if (status === 'authenticated') {
      setIsSessionReady(true);
    }
  }, [status]);

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

  const handleMonthChange = (monthName: string, year: number) => {
    setFormData((prev) => ({
      ...prev,
      month: `${monthName}-${year}`
    }));
  };

  const calculateGrandTotal = () => {
    return formData.items.reduce((sum, item) => sum + (parseFloat(item.totalPrice) || 0), 0);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentUser = session?.user as CustomSessionUser;

    
    
    if (!currentUser?.email) {
      Swal.fire({
        icon: "error",
        title: "Login Required",
        text: "Please login to save entry",
        confirmButtonColor: "#10b981",
      });
      return;
    }

    if (!currentUser?.secretCode) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Secret code not found. Please re-login.",
        confirmButtonColor: "#10b981",
      });
      return;
    }

    setLoading(true);

    try {
      const grandTotal = calculateGrandTotal();

      const costdata = {
        date: formData.date,
        month: formData.month,
        Manageremail: currentUser.email,
        ManagerName: currentUser.name || currentUser.email?.split('@')[0] || "Manager",
        category: formData.category,
        buyer: formData.buyer || "Unknown",
        note: formData.note,
        items: formData.items.map(item => ({
          itemName: item.itemName,
          quantity: item.quantity,
          unitPrice: item.unitPrice,
          totalPrice: item.totalPrice
        })),
        grandTotal: grandTotal,
        secretCode: currentUser.secretCode
      };

      const result = await Costentry(costdata);

      if (result && result.success) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Entry saved successfully!",
          confirmButtonColor: "#10b981",
          timer: 2000,
          showConfirmButton: true,
        });

        setFormData({
          date: new Date().toISOString().split("T")[0],
          month: getCurrentMonth(),
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
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: result?.error || "Failed to save entry. Please try again.",
          confirmButtonColor: "#10b981",
        });
      }
    } catch (error) {
      console.error("Error saving entry:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "An error occurred. Please try again.",
        confirmButtonColor: "#10b981",
      });
    } finally {
      setLoading(false);
    }
  };

  const grandTotal = calculateGrandTotal();
  const [selectedMonthName, selectedYear] = formData.month.split("-");

  if (status === 'loading' || !isSessionReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600">Please login to access this page</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8">
      <div className="max-w-7xl my-10 w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-2">
            <FaShoppingCart className="text-4xl text-green-600" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Bazar Entry
            </h2>
          </div>
          <p className="text-gray-500">Manage multiple items in one entry</p>
          {session?.user?.name && (
            <div className="mt-2 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
              <FaUser className="text-xs" />
              Manager: {session.user.name}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 border border-green-100">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-1 w-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded"></div>
            <h3 className="text-xl font-bold text-gray-800">Add New Entry</h3>
          </div>

          <form onSubmit={handleSubmit}>
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
                  <FaCalendar className="text-green-600 text-xs" />
                  Month <span className="text-red-500">*</span>
                </label>
                <div className="flex gap-2">
                  <select
                    value={selectedMonthName || "January"}
                    onChange={(e) => handleMonthChange(e.target.value, parseInt(selectedYear) || currentYear)}
                    className="flex-1 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {monthOptions.map((month) => (
                      <option key={month} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select
                    value={selectedYear || currentYear}
                    onChange={(e) => handleMonthChange(selectedMonthName || "January", parseInt(e.target.value))}
                    className="w-28 px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
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
                  Buyer Name
                </label>
                <input
                  type="text"
                  name="buyer"
                  value={formData.buyer}
                  onChange={handleChange}
                  placeholder="Who made the purchase?"
                  className="w-full px-3 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="md:col-span-2">
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
                  Tk {grandTotal.toFixed(2)}
                </div>
              </div>
              <div className="text-xs text-gray-500 mt-2 text-right">
                Total {formData.items.length} item(s)
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:from-green-600 hover:to-emerald-700 transition-all duration-200 font-semibold shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
          </form>
        </div>
      </div>
    </div>
  );
};

export default Page;