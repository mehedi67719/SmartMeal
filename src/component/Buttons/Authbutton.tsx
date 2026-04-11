"use client"
import { LogIn, UserPlus, LogOut } from 'lucide-react';
import Link from 'next/link';
import { signOut, useSession } from 'next-auth/react';
import React from 'react';

const Authbutton = () => {
    const { data: session } = useSession();

    const authLinks = [
        { name: 'Login', href: '/login', variant: 'outline', icon: LogIn },
        { name: 'Sign Up', href: '/register', variant: 'primary', icon: UserPlus },
    ];

    return (
        <div>
            {
                session ? (
                    <button
                        onClick={() => signOut()}
                        className="px-6 py-2 rounded-xl text-sm font-semibold bg-red-500 text-white shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 flex items-center gap-2.5"
                    >
                        <LogOut className="w-4 h-4" />
                        Logout
                    </button>
                ) : (
                    <div className="hidden md:flex items-center gap-2">
                        {authLinks.map(({ name, href, variant, icon: Icon }) => (
                            <Link
                                key={name}
                                href={href}
                                className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-sm font-semibold transition-all ${variant === 'primary'
                                    ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg hover:scale-105'
                                    : 'border border-gray-300 text-gray-700 hover:border-emerald-500 hover:text-emerald-600 hover:bg-emerald-50'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {name}
                            </Link>
                        ))}
                    </div>
                )
            }
        </div>
    );
};

export default Authbutton;