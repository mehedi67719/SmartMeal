export const currentmounthdays = () => {
  const nowdate = new Date();
  const year = nowdate.getFullYear();
  const monthIndex = nowdate.getMonth();

  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const dates = Array.from({ length: totalDays }, (_, i) => i + 1);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const month = {
    monthName: monthNames[monthIndex], 
    monthIndex: monthIndex,           
    year: year,
    days: dates
  };

  return month;
};