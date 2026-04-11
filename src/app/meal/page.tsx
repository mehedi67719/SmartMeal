import { currentmounthdays } from '@/component/hooks/currentmounthdays';
import DatePage from '@/component/pages/MealPage/DatePage';
import React from 'react';

const Page = () => {
  const days = currentmounthdays();

//   console.log(days);

  return (
    <div >
      <DatePage days={days}></DatePage>
    </div>
  );
};

export default Page;