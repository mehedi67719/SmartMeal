'use client';

import React, { useEffect, useState } from 'react';
import { alluser } from '@/server/user/alluser';
import Swal from 'sweetalert2';
import { FiUser, FiMail, FiDollarSign, FiSave } from 'react-icons/fi';
import { FaCrown, FaStar, FaUser } from 'react-icons/fa';
import { deposit, getTotalUserDeposit } from '@/server/deposite/deposite';
import Link from 'next/link';

interface User {
    _id: string;
    Name: string;
    email: string;
    accountType: 'controller' | 'manager' | 'member';
    messName: string;
    secretCode: string;
}

const Page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [depositAmounts, setDepositAmounts] = useState<{ [key: string]: number }>({});
    const [userTotals, setUserTotals] = useState<{ [key: string]: number }>({});
    const [selectedMonth, setSelectedMonth] = useState('');

    const months = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    useEffect(() => {
        const currentMonth = months[new Date().getMonth()];
        setSelectedMonth(currentMonth);
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const response: any = await alluser();
            
            let usersArray: any[] = [];
            if (Array.isArray(response)) {
                usersArray = response;
            } else if (response && response.data && Array.isArray(response.data)) {
                usersArray = response.data;
            } else {
                usersArray = [];
            }
            
            const serializedUsers: User[] = usersArray.map((user: any) => ({
                _id: user._id.toString(),
                Name: user.Name,
                email: user.email,
                accountType: user.accountType,
                messName: user.messName,
                secretCode: user.secretCode
            }));
            setUsers(serializedUsers);
            await loadUserTotals(serializedUsers);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    };

    const loadUserTotals = async (usersList: User[]) => {
        try {
            const totals: { [key: string]: number } = {};
            for (const user of usersList) {
                const total = await getTotalUserDeposit(user._id);
                totals[user._id] = typeof total === 'number' ? total : 0;
            }
            setUserTotals(totals);
        } catch (error) {
            console.error('Error loading totals:', error);
        }
    };

    const saveDeposit = async (user: User) => {
        const amount = depositAmounts[user._id];
        
        if (!amount || amount <= 0) {
            await Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid deposit amount',
                icon: 'error',
                confirmButtonColor: '#22c55e'
            });
            return;
        }

        if (!selectedMonth) {
            await Swal.fire({
                title: 'Error!',
                text: 'Please select a month',
                icon: 'error',
                confirmButtonColor: '#22c55e'
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Confirm Deposit',
            text: `Are you sure you want to add $${amount} to ${user.Name}'s account for ${selectedMonth}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, save it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            setLoading(true);
            try {
                const depositResult = await deposit(amount, user, selectedMonth, user.secretCode);
                
                if (depositResult && depositResult.success) {
                    await loadUserTotals(users);
                    setDepositAmounts(prev => ({ ...prev, [user._id]: 0 }));
                    
                    await Swal.fire({
                        title: 'Success!',
                        text: `$${amount} has been added to ${user.Name}'s deposit for ${selectedMonth}`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    await Swal.fire({
                        title: 'Error!',
                        text: depositResult?.error || 'Failed to save deposit',
                        icon: 'error',
                        confirmButtonColor: '#22c55e'
                    });
                }
            } catch (error) {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong. Please try again.',
                    icon: 'error',
                    confirmButtonColor: '#22c55e'
                });
            } finally {
                setLoading(false);
            }
        }
    };

    const getTotalDeposit = (userId: string) => {
        return userTotals[userId] || 0;
    };

    const getRoleIcon = (role: string) => {
        switch(role) {
            case 'controller': return <FaCrown className="text-yellow-500" />;
            case 'manager': return <FaStar className="text-blue-500" />;
            default: return <FaUser className="text-green-500" />;
        }
    };

    const getRoleBadge = (role: string) => {
        switch(role) {
            case 'controller': return 'bg-yellow-100 text-yellow-800';
            case 'manager': return 'bg-blue-100 text-blue-800';
            default: return 'bg-green-100 text-green-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <div className="container">
                <div className="mb-8 flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Member Deposit</h1>
                        <p className="text-gray-600 mt-1">Add deposit to member accounts with month selection</p>
                    </div>
                    <Link 
                        href="/deposite-history"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition shadow-sm"
                    >
                        View Deposit History
                    </Link>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Select Month</label>
                    <select
                        value={selectedMonth}
                        onChange={(e) => setSelectedMonth(e.target.value)}
                        className="w-64 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                    >
                        <option value="">Select Month</option>
                        {months.map(month => (
                            <option key={month} value={month}>{month}</option>
                        ))}
                    </select>
                </div>

                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-green-700 text-white">
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Member</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Email</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Role</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Secret Code</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Total Deposit</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Amount</th>
                                    <th className="px-6 py-3 text-left text-sm font-semibold">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {users.map((user) => (
                                    <tr key={user._id} className="hover:bg-gray-50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                                    <FiUser className="text-gray-600" />
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-gray-800">{user.Name}</p>
                                                    <p className="text-xs text-gray-500">{user.messName}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiMail className="text-gray-400" />
                                                <span className="text-gray-600">{user.email}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                {getRoleIcon(user.accountType)}
                                                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${getRoleBadge(user.accountType)}`}>
                                                    {user.accountType.charAt(0).toUpperCase() + user.accountType.slice(1)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                                                    {user.secretCode}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <FiDollarSign className="text-green-600" />
                                                <span className="text-xl font-bold text-green-600">
                                                    ${getTotalDeposit(user._id)}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative">
                                                <input
                                                    type="number"
                                                    value={depositAmounts[user._id] || ''}
                                                    onChange={(e) => setDepositAmounts(prev => ({
                                                        ...prev,
                                                        [user._id]: parseFloat(e.target.value) || 0
                                                    }))}
                                                    placeholder="Enter amount"
                                                    className="w-40 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                                                />
                                                <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">$</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => saveDeposit(user)}
                                                disabled={loading}
                                                className="bg-green-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-green-700 transition shadow-sm disabled:opacity-50 flex items-center gap-2"
                                            >
                                                <FiSave />
                                                <span>Save</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;