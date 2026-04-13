"use client"
import { SessionProvider } from 'next-auth/react';
import React from 'react';

interface NextAuthProviderProps {
    children: React.ReactNode;
}

const NextAuthprovider = ({ children }: NextAuthProviderProps) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthprovider;