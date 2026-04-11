"use client"
import { SessionProvider } from 'next-auth/react';
import React from 'react';

const NextAuthprovider = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    );
};

export default NextAuthprovider;