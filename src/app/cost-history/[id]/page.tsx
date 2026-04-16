"use client";

import { costdetels } from "@/server/Cost/costdetels";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";

type CostItem = {
  itemName: string;
  quantity: string;
  unitPrice: string;
  totalPrice: string;
};

type CostData = {
  _id: string;
  date: string;
  month: string;
  Manageremail: string;
  ManagerName: string;
  category: string;
  buyer: string;
  note: string;
  items: CostItem[];
  grandTotal: number;
  createdAt: string;
};

const Page = () => {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<CostData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const result = await costdetels(id);
        if (result.success && result.data) {
          setData(result.data);
        } else {
          setError(result.message || "Failed to load cost details");
        }
      } catch (err) {
        setError("An error occurred while fetching data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 text-lg">Loading cost details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <p className="text-red-600 text-lg">{error}</p>
          <Link href="/cost-history">
            <button className="mt-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-700 transition-colors">
              Back to Cost History
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">No data found</p>
      </div>
    );
  }

  return (
    <div className="py-10 px-3">
      <div className="container mx-auto px-4 max-w-5xl">
        <Link href="/cost-history">
          <button className="mb-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-700 transition-colors">
            ← Back to Cost History
          </button>
        </Link>

        <div className="bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
          <div className="bg-green-700 text-white p-6">
            <h1 className="text-3xl font-semibold">Cost Details</h1>
            <p className="text-green-100 mt-2">Transaction ID: {data._id}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                <p className="text-gray-900 text-lg">{data.date}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Month</h3>
                <p className="text-gray-900">
                  <span className="bg-green-50 px-3 py-1 rounded-md text-sm font-medium text-green-700">
                    {data.month}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Manager</h3>
                <p className="text-gray-900 font-medium text-green-700">{data.ManagerName}</p>
                <p className="text-gray-500 text-sm">{data.Manageremail}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Category</h3>
                <p className="text-gray-900">
                  <span className="bg-orange-50 px-3 py-1 rounded-md text-sm">
                    {data.category}
                  </span>
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Buyer</h3>
                <p className="text-gray-900">{data.buyer}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Created At</h3>
                <p className="text-gray-900">{new Date(data.createdAt).toLocaleString()}</p>
              </div>
              {data.note && (
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Note</h3>
                  <p className="text-gray-900 bg-gray-50 p-3 rounded-lg">{data.note}</p>
                </div>
              )}
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Items List</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-green-50 border-b border-gray-200">
                      <th className="p-3 text-left">Item Name</th>
                      <th className="p-3 text-right">Quantity</th>
                      <th className="p-3 text-right">Unit Price</th>
                      <th className="p-3 text-right">Total Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.items.map((item, index) => (
                      <tr key={index} className="border-b border-gray-100 hover:bg-green-50 transition-colors">
                        <td className="p-3 text-gray-700">{item.itemName}</td>
                        <td className="p-3 text-right text-gray-700">{item.quantity}</td>
                        <td className="p-3 text-right text-gray-700">৳{parseFloat(item.unitPrice).toLocaleString()}</td>
                        <td className="p-3 text-right text-gray-700 font-medium">৳{parseFloat(item.totalPrice).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-green-50">
                      <td colSpan={3} className="p-3 text-right font-bold text-gray-700">Grand Total:</td>
                      <td className="p-3 text-right font-bold text-green-700 text-lg">৳{data.grandTotal.toLocaleString()}</td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;