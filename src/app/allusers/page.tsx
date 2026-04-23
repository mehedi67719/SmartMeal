'use client';

import { alluser } from '@/server/user/alluser';
import React, { useEffect, useState, useCallback } from 'react';
import { FiMail, FiTrash2, FiUsers } from 'react-icons/fi';
import { FaCrown, FaStar, FaUser } from 'react-icons/fa';
import { IoIosArrowDown } from 'react-icons/io';
import Swal from 'sweetalert2';
import { deleteuser } from '@/server/user/deleteuser';
import { updaterole } from '@/server/user/updaterole';

interface User {
    _id: string;
    Name: string;
    email: string;
    accountType: 'controller' | 'manager' | 'member';
    messName: string;
    secretCode: string;
    password: string;
}

interface ApiResponse<T> {
    status: number;
    data: T;
    success: boolean;
    message?: string;
}

const Page = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState({ delete: '', role: '' });

    const loadUsers = useCallback(async () => {
        try {
            const response: any = await alluser();
            
            let data: any[] = [];
            if (Array.isArray(response)) {
                data = response;
            } else if (response && response.data && Array.isArray(response.data)) {
                data = response.data;
            } else if (response && Array.isArray(response)) {
                data = response;
            } else {
                data = [];
            }
            
            const serializedUsers = data.map((user: any) => ({
                _id: user._id.toString(),
                Name: user.Name,
                email: user.email,
                accountType: user.accountType,
                messName: user.messName,
                secretCode: user.secretCode,
                password: user.password
            }));
            setUsers(serializedUsers);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    }, []);

    useEffect(() => {
        loadUsers();
    }, [loadUsers]);

    const handleDelete = async (id: string, email: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: `You want to delete ${email}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            setLoading(prev => ({ ...prev, delete: id }));
            try {
                const res = await deleteuser(email);
                if (res.deletedCount > 0) {
                    setUsers(prevUsers => prevUsers.filter(u => u._id !== id));
                    await Swal.fire({
                        title: 'Deleted!',
                        text: 'User has been deleted successfully.',
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    await Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete user.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6'
                    });
                }
            } catch (error) {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                });
            } finally {
                setLoading(prev => ({ ...prev, delete: '' }));
            }
        }
    };

    const handleRoleChange = async (id: string, email: string, newRole: string) => {
        const currentUser = users.find(u => u._id === id);
        if (!currentUser || newRole === currentUser.accountType) return;
        
        const result = await Swal.fire({
            title: 'Change Role?',
            text: `Change role to ${newRole}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, change it!',
            cancelButtonText: 'Cancel'
        });

        if (result.isConfirmed) {
            setLoading(prev => ({ ...prev, role: id }));
            try {
                const res = await updaterole(newRole, email);
                if (res.modifiedCount > 0) {
                    setUsers(prevUsers => prevUsers.map(u => 
                        u._id === id ? { ...u, accountType: newRole as User['accountType'] } : u
                    ));
                    await Swal.fire({
                        title: 'Updated!',
                        text: `Role changed to ${newRole} successfully.`,
                        icon: 'success',
                        timer: 1500,
                        showConfirmButton: false
                    });
                } else {
                    await Swal.fire({
                        title: 'Error!',
                        text: 'Failed to change role.',
                        icon: 'error',
                        confirmButtonColor: '#3085d6'
                    });
                }
            } catch (error) {
                await Swal.fire({
                    title: 'Error!',
                    text: 'Something went wrong.',
                    icon: 'error',
                    confirmButtonColor: '#3085d6'
                });
            } finally {
                setLoading(prev => ({ ...prev, role: '' }));
            }
        }
    };

    const getRoleStyle = (role: string) => {
        switch(role) {
            case 'controller':
                return { bg: 'bg-green-800', icon: FaCrown };
            case 'manager':
                return { bg: 'bg-green-600', icon: FaStar };
            default:
                return { bg: 'bg-green-500', icon: FaUser };
        }
    };

    const getInitials = (name: string) => {
        return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
    };

    return (
        <div className="min-h-screen bg-white p-8">
            <div className="container">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-green-800">All Users</h1>
                    <p className="text-green-600 mt-1">Manage mess members and their roles</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-700 text-sm">Total Users</p>
                                <p className="text-green-900 text-3xl font-bold">{users.length}</p>
                            </div>
                            <FiUsers className="text-3xl text-green-600" />
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-700 text-sm">Controllers</p>
                                <p className="text-green-900 text-3xl font-bold">{users.filter(u => u.accountType === 'controller').length}</p>
                            </div>
                            <FaCrown className="text-3xl text-green-600" />
                        </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-green-700 text-sm">Members & Managers</p>
                                <p className="text-green-900 text-3xl font-bold">{users.filter(u => u.accountType !== 'controller').length}</p>
                            </div>
                            <FaUser className="text-3xl text-green-600" />
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-lg border border-green-200 overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-green-800">
                                    <th className="px-6 py-3 text-left text-white font-semibold text-sm">User</th>
                                    <th className="px-6 py-3 text-left text-white font-semibold text-sm">Email</th>
                                    <th className="px-6 py-3 text-left text-white font-semibold text-sm">Role</th>
                                    <th className="px-6 py-3 text-left text-white font-semibold text-sm">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-green-100">
                                {users.map((user) => {
                                    const RoleIcon = getRoleStyle(user.accountType).icon;
                                    const roleStyle = getRoleStyle(user.accountType);
                                    return (
                                        <tr key={user._id} className="hover:bg-green-50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <span className="text-green-800 font-bold text-sm">
                                                            {getInitials(user.Name)}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{user.Name}</p>
                                                        <p className="text-xs text-green-600">{user.messName}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <FiMail className="text-green-400" />
                                                    <span className="text-gray-600">{user.email}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="relative">
                                                    <select
                                                        value={user.accountType}
                                                        onChange={(e) => handleRoleChange(user._id, user.email, e.target.value)}
                                                        disabled={loading.role === user._id}
                                                        className={`${roleStyle.bg} text-white px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer appearance-none pl-10 pr-8 border-none shadow-sm`}
                                                    >
                                                        <option value="controller">Controller</option>
                                                        <option value="manager">Manager</option>
                                                        <option value="member">Member</option>
                                                    </select>
                                                    <RoleIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white text-sm" />
                                                    <IoIosArrowDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white text-sm pointer-events-none" />
                                                    {loading.role === user._id && (
                                                        <div className="absolute right-8 top-1/2 transform -translate-y-1/2">
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => handleDelete(user._id, user.email)}
                                                    disabled={loading.delete === user._id}
                                                    className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold text-sm hover:bg-red-700 transition shadow-sm disabled:opacity-50 flex items-center gap-2"
                                                >
                                                    {loading.delete === user._id ? (
                                                        <>
                                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                            <span>Deleting...</span>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <FiTrash2 />
                                                            <span>Delete</span>
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-green-50 px-6 py-3 border-t border-green-200">
                        <p className="text-sm text-green-700">
                            Showing <span className="font-sembold">{users.length}</span> users
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;