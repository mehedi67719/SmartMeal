'use client';

import React, { useEffect, useState } from 'react';
import { getDeposits } from '@/server/deposite/deposite';
import { FiDollarSign, FiCalendar, FiUser, FiMail } from 'react-icons/fi';
import Link from 'next/link';
import { useSession } from 'next-auth/react';

interface DepositData {
    _id?: string;
    userId: string;
    userName: string;
    userEmail: string;
    amount: number;
    date: Date;
    messName: string;
    month: string;
    secretCode: string;
}

const Page = () => {
    const [deposits, setDeposits] = useState<DepositData[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterMonth, setFilterMonth] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [isSessionReady, setIsSessionReady] = useState(false);
    const { data: session, status } = useSession();

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        if (status === 'authenticated' && session?.user?.secretCode) {
            setIsSessionReady(true);
            loadDeposits();
        } else if (status === 'unauthenticated') {
            setIsSessionReady(true);
            setLoading(false);
        }
    }, [status, session]);

    const loadDeposits = async () => {
        const currentSecretCode = session?.user?.secretCode;
        
        if (!currentSecretCode) {
            console.error('No secret code found');
            setLoading(false);
            return;
        }

        try {
            const response: any = await getDeposits(currentSecretCode);
            
            let depositsArray: any[] = [];
            
            if (Array.isArray(response)) {
                depositsArray = response;
            } else if (response && response.data && Array.isArray(response.data)) {
                depositsArray = response.data;
            } else if (response && typeof response === 'object') {
                depositsArray = [response];
            } else {
                depositsArray = [];
            }
            
            const formattedData: DepositData[] = depositsArray.map((item: any) => ({
                _id: item._id?.toString() || item._id,
                userId: item.userId || item.user_id || '',
                userName: item.userName || item.name || item.user_name || '',
                userEmail: item.userEmail || item.email || item.user_email || '',
                amount: typeof item.amount === 'number' ? item.amount : parseFloat(item.amount) || 0,
                date: item.date ? new Date(item.date) : new Date(),
                messName: item.messName || item.mess_name || '',
                month: item.month || '',
                secretCode: item.secretCode || item.secret_code || ''
            }));
            
            setDeposits(formattedData);
        } catch (error) {
            console.error('Error loading deposits:', error);
        } finally {
            setLoading(false);
        }
    };

    const getTotalAmount = () => {
        let filtered = deposits;
        if (filterMonth) {
            filtered = filtered.filter(d => d.month === filterMonth);
        }
        if (searchTerm) {
            filtered = filtered.filter(d => 
                d.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered.reduce((sum, d) => sum + d.amount, 0);
    };

    const getFilteredDeposits = () => {
        let filtered = deposits;
        if (filterMonth) {
            filtered = filtered.filter(d => d.month === filterMonth);
        }
        if (searchTerm) {
            filtered = filtered.filter(d => 
                d.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                d.userEmail.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        return filtered;
    };

    if (status === 'loading' || !isSessionReady) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-green-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (status === 'unauthenticated') {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <p className="text-red-600">Please login to view deposit history</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="mt-4 text-green-600">Loading deposits...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="container mx-auto">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-green-800">Deposit History</h1>
                        <p className="text-green-600 mt-1">View all member deposit records</p>
                    </div>
                    <Link 
                        href="/deposite"
                        className="bg-green-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-700 transition shadow-sm"
                    >
                        Add New Deposit
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700">Total Deposits</p>
                                <p className="text-2xl font-bold text-green-800">{deposits.length}</p>
                            </div>
                            <FiDollarSign className="text-3xl text-green-600" />
                        </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700">Total Amount</p>
                                <p className="text-2xl font-bold text-green-800">${getTotalAmount()}</p>
                            </div>
                            <FiDollarSign className="text-3xl text-green-600" />
                        </div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-green-700">Unique Members</p>
                                <p className="text-2xl font-bold text-green-800">{new Set(deposits.map(d => d.userId)).size}</p>
                            </div>
                            <FiUser className="text-3xl text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-green-200 p-4 mb-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-2">Filter by Month</label>
                            <select
                                value={filterMonth}
                                onChange={(e) => setFilterMonth(e.target.value)}
                                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-700"
                            >
                                <option value="">All Months</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-green-700 mb-2">Search by Name or Email</label>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search member..."
                                className="w-full px-4 py-2 border border-green-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 text-gray-700"
                            />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow-md border border-green-200 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-green-800 text-white">
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Member</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Month</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-green-100">
                                {getFilteredDeposits().length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-8 text-center text-green-500">
                                            No deposits found
                                        </td>
                                    </tr>
                                ) : (
                                    getFilteredDeposits().map((deposit, index) => (
                                        <tr key={deposit._id || index} className="hover:bg-green-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                                                        <FiUser className="text-green-600" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-gray-800">{deposit.userName}</p>
                                                        <p className="text-xs text-green-600">{deposit.messName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="text-green-400" />
                                                    <span className="text-gray-600">{deposit.userEmail}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FiCalendar className="text-green-500" />
                                                    <span className="text-green-700 font-semibold">{deposit.month}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FiDollarSign className="text-green-600" />
                                                    <span className="text-xl font-bold text-green-700">
                                                        ${deposit.amount}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-green-600">
                                                {new Date(deposit.date).toLocaleDateString()}
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;