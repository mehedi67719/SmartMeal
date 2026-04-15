"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getCostById, CostData } from "@/server/Cost/Costhistory";

const CostDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [data, setData] = useState<CostData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (params.id) {
      fetchCostDetails();
    }
  }, [params.id]);

  const fetchCostDetails = async () => {
    setError(null);
    try {
      const id = Array.isArray(params.id) ? params.id[0] : params.id;
      const result = await getCostById(id);
      
      if (result.success && result.data) {
        setData(result.data);
      } else {
        setError(result.message || "Failed to fetch cost details");
      }
    } catch (error) {
      console.error("Error fetching cost details:", error);
      setError("An error occurred while fetching details");
    }
  };

  const calculateItemTotal = (item: { price: number; quantity: number }) => {
    return (item.price || 0) * (item.quantity || 0);
  };

  if (error || !data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-2xl mb-4">
            <svg className="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 mb-2">{error || "No data found"}</h3>
          <button
            onClick={() => router.back()}
            className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-200"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <button
            onClick={() => router.back()}
            className="inline-flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to History
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <h1 className="text-2xl font-bold text-white">Cost Details</h1>
            <p className="text-indigo-100 mt-1">Complete information about this transaction</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-slate-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Date</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">{data.date}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Month</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">{data.month}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Manager Name</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">{data.ManagerName}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Manager Email</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">{data.Manageremail}</p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-xl p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</label>
                    <p className="text-base font-semibold text-slate-900 mt-1 capitalize">{data.category}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Buyer</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">{data.buyer}</p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Created At</label>
                    <p className="text-base font-semibold text-slate-900 mt-1">
                      {new Date(data.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Transaction ID</label>
                    <p className="text-base font-semibold text-slate-900 mt-1 text-xs break-all">{data._id?.toString()}</p>
                  </div>
                </div>
              </div>
            </div>

            {data.note && (
              <div className="mb-8 bg-amber-50 rounded-xl p-6 border border-amber-100">
                <label className="text-xs font-semibold text-amber-600 uppercase tracking-wider">Note</label>
                <p className="text-base text-amber-800 mt-1">{data.note}</p>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-xl font-bold text-slate-900 mb-5">Items Details</h3>
              <div className="overflow-x-auto border border-slate-200 rounded-xl">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Item Name</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Quantity</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Unit Price</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">Total</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-100">
                    {data.items.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50 transition-all duration-200">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{item.name}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{item.quantity}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">৳{item.price?.toFixed(2)}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-900">৳{calculateItemTotal(item).toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-50">
                    <tr>
                      <td colSpan={3} className="px-6 py-4 text-right text-base font-semibold text-slate-900">
                        Grand Total:
                      </td>
                      <td className="px-6 py-4 text-xl font-bold text-indigo-600">
                        ৳{data.grandTotal?.toFixed(2)}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                onClick={() => router.back()}
                className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 font-medium shadow-lg shadow-indigo-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostDetailsPage;