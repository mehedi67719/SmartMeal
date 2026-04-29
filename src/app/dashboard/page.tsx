
import AdminDashboard from '@/component/pages/Dashboard/Admindashboard/admindashboard';
import Managerdashboard from '@/component/pages/Dashboard/Managerdashboard/managerdashboard';
import Memberdashboard from '@/component/pages/Dashboard/Memberdashboard/Memberdashboard';
import React from 'react';

const page = () => {
  return (
    <div>
      {/* <Managerdashboard/> */}
      {/* <Memberdashboard/> */}

      <AdminDashboard/>
    </div>
  );
};

export default page;