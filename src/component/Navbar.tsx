'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home,
  Info,
  Utensils,
  Phone,
  Menu,
  X,
  Calculator,
  UserPlus,
  LogIn,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  History,
  UserCircle,
  Users,
  DollarSign,
} from 'lucide-react';
import { PiBowlFoodFill } from 'react-icons/pi';
import { FaMoneyBill } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';
import { GiHotMeal } from 'react-icons/gi';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, status } = useSession();
  const isLoading = status === 'loading';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about', icon: Info },
    { name: 'Meal Calculator', href: '/meal-calculator', icon: Calculator },
    { name: 'Meal', href: '/meal', icon: PiBowlFoodFill },
    { name: 'Cost entry', href: '/cost-entry', icon: FaMoneyBill },
    { name: 'Contact', href: '/contact', icon: Phone },
  ];

  const dropdownLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { name: 'Profile', href: '/profile', icon: UserCircle },
    { name: 'Cost History', href: '/cost-history', icon: History },
    { name: 'All Users', href: '/allusers', icon: Users },
    { name: 'AllUsers Meals', href: '/allusers-meals', icon: GiHotMeal },
    { name: 'Member Deposit', href: '/member-deposit', icon: DollarSign },
  ];

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
    setIsUserMenuOpen(false);
    setIsMenuOpen(false);
  };

  const isActive = (href: string) => {
    if (href === '/' && pathname === '/') return true;
    if (href !== '/' && pathname?.startsWith(href)) return true;
    return false;
  };

  const getUserInitials = () => {
    if (session?.user?.name) return session.user.name.charAt(0).toUpperCase();
    if (session?.user?.email) return session.user.email.charAt(0).toUpperCase();
    return 'U';
  };

  const getUserDisplayName = () => {
    if (session?.user?.name) return session.user.name;
    if (session?.user?.email) return session.user.email.split('@')[0];
    return 'User';
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
                <Utensils className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-xl bg-gradient-to-r from-emerald-600 to-emerald-800 bg-clip-text text-transparent">
                SmartMeal
              </span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map(({ name, href, icon: Icon }) => (
                <Link
                  key={name}
                  href={href}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(href)
                      ? 'bg-emerald-50 text-emerald-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-600'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {name}
                </Link>
              ))}
            </div>

            <div className="hidden md:block">
              {isLoading ? (
                <div className="w-20 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : session ? (
                <div className="relative" ref={menuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {getUserInitials()}
                    </div>
                    <span className="text-sm font-medium text-gray-700">
                      {getUserDisplayName()}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-gray-900">{session.user?.name || 'User'}</p>
                        <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                      </div>

                      <div className="py-1">
                        {dropdownLinks.map(({ name, href, icon: Icon }) => (
                          <Link
                            key={name}
                            href={href}
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            {name}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-gray-100 pt-1">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-emerald-600 transition-colors"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="px-4 py-1.5 rounded-lg text-sm font-medium bg-gradient-to-r from-emerald-600 to-emerald-700 text-white shadow-md hover:shadow-lg transition-all"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <div className={`md:hidden transition-all duration-300 overflow-hidden bg-white border-t border-gray-100 ${
          isMenuOpen ? 'max-h-[calc(100vh-4rem)] overflow-y-auto' : 'max-h-0'
        }`}>
          <div className="p-4 space-y-2">
            {navLinks.map(({ name, href, icon: Icon }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setIsMenuOpen(false)}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium ${
                  isActive(href)
                    ? 'bg-emerald-50 text-emerald-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {name}
              </Link>
            ))}

            <div className="pt-3 space-y-2 border-t border-gray-100">
              {session ? (
                <>
                  <div className="px-3 py-2 bg-gray-50 rounded-lg">
                    <p className="text-sm font-medium text-gray-900">{getUserDisplayName()}</p>
                    <p className="text-xs text-gray-500 truncate">{session.user?.email}</p>
                  </div>
                  {dropdownLinks.map(({ name, href, icon: Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50"
                    >
                      <Icon className="w-4 h-4" />
                      {name}
                    </Link>
                  ))}
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold border border-gray-300 text-gray-700"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center justify-center px-4 py-2 rounded-lg text-sm font-semibold bg-gradient-to-r from-emerald-600 to-emerald-700 text-white"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
      <div className="h-16" />
    </>
  );
};

export default Navbar;