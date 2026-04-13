"use client"
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { MdFastfood } from 'react-icons/md';
import { FaHamburger, FaPizzaSlice, FaFish, FaUser, FaEnvelope, FaHome, FaLock, FaKey, FaCheckCircle } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { postuser } from '@/server/user/auth';

interface PostUserResponse {
    success: boolean;
    insertedId?: string;
    message?: string;
}

const SignUpPage: React.FC = () => {
    const [accountType, setAccountType] = useState<'member' | 'controller'>('member');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        messName: '',
        secretCode: '',
        password: '',
        confirmPassword: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Your confirm password is wrong",
            });
            return;
        }

        const newuser = {
            Name: formData.fullName,
            email: formData.email,
            accountType: accountType,
            messName: formData.messName,
            secretCode: formData.secretCode,
            password: formData.password
        };

        console.log("Form Data Submitted:", newuser);

        try {
            const result = await postuser(newuser) as PostUserResponse;

            if (result?.success) {
                Swal.fire({
                    icon: "success",
                    title: "Success!",
                    text: "Account created successfully",
                });

                setFormData({
                    fullName: '',
                    email: '',
                    messName: '',
                    secretCode: '',
                    password: '',
                    confirmPassword: ''
                });

                setAccountType('member');
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: result?.message || "Something went wrong",
                });
            }

        } catch (error: any) {
            Swal.fire({
                icon: "error",
                title: "Server Error",
                text: error?.message || "An unexpected error occurred",
            });
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gray-100 p-4 font-sans text-gray-800">
            <div className="flex flex-col md:flex-row w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl">

                <div className="md:w-5/12 bg-[#009444] p-10 flex flex-col items-center justify-center text-white text-center">
                    <div className="bg-white/20 p-4 rounded-full mb-4">
                        <MdFastfood className="text-5xl" />
                    </div>
                    <h1 className="text-3xl font-bold mb-1">SmartMeal</h1>
                    <p className="text-sm opacity-90 mb-8 font-light">Delicious meals, smart choices</p>
                    <div className="flex space-x-5 mb-8 text-2xl opacity-80">
                        <FaHamburger /> <FaPizzaSlice /> <FaFish />
                    </div>
                    <p className="text-xs leading-relaxed opacity-75 mb-10 px-4">
                        Join thousands of food lovers who trust SmartMeal for their daily dining needs
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                        {['Fresh', 'Healthy', 'Tasty', 'Quick'].map((tag) => (
                            <span key={tag} className="bg-white/20 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="md:w-7/12 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaUser className="inline mr-1 mb-1" /> Full Name</label>
                            <input type="text" name="fullName" placeholder="Mehedi Hassan" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaEnvelope className="inline mr-1 mb-1" /> Email Address</label>
                            <input type="email" name="email" placeholder="meh67719@gmail.com" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter">Account Type</label>
                            <div className="flex bg-gray-100 p-1 rounded-xl">
                                <button type="button" onClick={() => setAccountType('member')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${accountType === 'member' ? 'bg-[#009444] text-white shadow-md' : 'text-gray-500'}`}>Member</button>
                                <button type="button" onClick={() => setAccountType('controller')} className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${accountType === 'controller' ? 'bg-[#009444] text-white shadow-md' : 'text-gray-500'}`}>Controller</button>
                            </div>
                        </div>


                        {accountType === 'member' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaHome className="inline mr-1 mb-1" /> Select Your Mess</label>
                                    <select name="messName" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none appearance-none" onChange={handleChange} required>
                                        <option value="">Select a Mess</option>
                                        <option value="ENG Mess">ENG Mess</option>
                                        <option value="Dhaka Mess">Dhaka Mess</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaKey className="inline mr-1 mb-1" /> Enter Your Secret Code</label>
                                    <input type="text" name="secretCode" placeholder="462525" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        {accountType === 'controller' && (
                            <div className="space-y-4 animate-in fade-in slide-in-from-top-1 duration-300">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaHome className="inline mr-1 mb-1" /> Enter Your Mess Name</label>
                                    <input type="text" name="messName" placeholder="Create Mess Name" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaKey className="inline mr-1 mb-1" /> Create Your Secret Code</label>
                                    <input type="text" name="secretCode" placeholder="Assign a Code" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaLock className="inline mr-1 mb-1" /> Password</label>
                                <input type="password" name="password" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase tracking-tighter"><FaLock className="inline mr-1 mb-1" /> Confirm</label>
                                <input type="password" name="confirmPassword" placeholder="••••••••" className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 outline-none" onChange={handleChange} required />
                            </div>
                        </div>

                        <button type="submit" className="w-full bg-[#009444] hover:bg-[#007a37] text-white font-bold py-3 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 mt-6 active:scale-[0.98]">
                            <FaCheckCircle /> Create Account
                        </button>
                        <p className="text-center text-xs text-gray-500 mt-4">
                            Already have an account? <span className="text-[#009444] font-bold cursor-pointer hover:underline">Sign In</span>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;