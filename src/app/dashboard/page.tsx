"use client"
import AdminDashboard from '@/component/pages/Dashboard/Admindashboard/admindashboard';
import Managerdashboard from '@/component/pages/Dashboard/Managerdashboard/managerdashboard';
import Memberdashboard from '@/component/pages/Dashboard/Memberdashboard/Memberdashboard';
import { useSession } from 'next-auth/react';
import React from 'react';

const Page = () => {
  const { data: session, status } = useSession();
  const role = (session?.user as { accountType?: string })?.accountType || '';

  console.log(role);
  console.log(status);

  if (status === "loading") {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh' 
      }}>
        <div>Loading...</div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    return <div>Please login to access this page</div>;
  }

  return (
    <div>
      {role === "member" && <Memberdashboard />}
      {role === "controller" && <AdminDashboard />}
      {role === "manager" && <Managerdashboard />}
    </div>
  );
};

export default Page;