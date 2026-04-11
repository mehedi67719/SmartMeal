'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Info,
  Utensils,
  Phone,
  Menu,
  X,
  Calculator,
  UserPlus,
  LogIn
} from 'lucide-react';
import Authbutton from './Buttons/Authbutton';
import { PiBowlFoodFill } from 'react-icons/pi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Meal Calculator', href: '/meal-calculator', icon: Calculator },
    { name: 'Meal', href: '/meal', icon: PiBowlFoodFill },
    { name: 'Contact', href: '/contact', icon: Phone },
    
  ];

  const authLinks = [
    { name: 'Login', href: '/login', variant: 'outline', icon: LogIn },
    { name: 'Sign Up', href: '/register', variant: 'primary', icon: UserPlus },
  ];

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname?.startsWith(href)) return true;
    return false;
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md border-b border-gray-100 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg sm:text-xl bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                SmartMeal
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${isActive(href)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                    }`}
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </Link>
              ))}
            </div>

            <Authbutton />

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div
          className={`md:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-100 ${isMenuOpen ? 'max-h-96' : 'max-h-0'
            }`}
        >
          <div className="p-4 space-y-2">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${isActive(href)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}

            <div className="pt-3 space-y-2 border-t border-gray-100">
              <Link
                href="/login"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700"
              >
                <LogIn className="w-4 h-4" />
                Login
              </Link>
              <Link
                href="/register"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md"
              >
                <UserPlus className="w-4 h-4" />
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="h-14 sm:h-16" />
    </>
  );
};

export default Navbar;