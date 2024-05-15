'use client';
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Typography from '@mui/material/Typography';

const data = [
  {
    name: 'Jan',
    AHT: 300,
  },
  {
    name: 'Feb',
    AHT: 320,
  },
  {
    name: 'Mar',
    AHT: 350,
  },
  {
    name: 'Apr',
    AHT: 380,
  },
  {
    name: 'May',
    AHT: 400,
  },
];

const Dashboard = () => {
  const averageAHT = Math.round(data.reduce((acc, current) => acc + current.AHT, 0) / data.length);

  return (
    <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
      <div className='col-span-full flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6'>
        <div className='bg-indigo-200 rounded-xl border border-gray-200 px-8 pt-0 pb-6 w-full'>
          <div className='grid lg:grid-rows-2 gap-0 items-center h-full w-full flex-1'>
            <div className='flex flex-col'>
              <h1 className='text-3xl xl:text-3xl text-indigo-800 font-semibold mb-2'>
                Analytical Dashboard
              </h1>
              <p className='font-medium'>Monitor and analyze customer service performance.</p>
            </div>
            <div className='flex justify-cente items-start'>
              <LineChart width={300} height={200} data={data}>
                <Line type="monotone" dataKey="AHT" stroke="#8884d8" />
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <Tooltip />
              </LineChart>
            </div>
          </div>
        </div>
        
        <div className='bg-white rounded-xl border border-gray-200 px-8 pt-2 pb-4 flex-none flex items-center justify-center'>
          <Typography variant="h4" align="center">
            <span className='text-indigo-800 font-semibold'>CSAT: </span>
            85
          </Typography>
        </div>
        <div className='bg-white rounded-xl border border-gray-200 px-8 pt-2 pb-4 flex-none flex items-center justify-center'>
        <Typography variant="h4" align="center">
                <span className='text-indigo-800 font-semibold'>AHT: </span>
                {averageAHT}
              </Typography>
          </div>
      </div>
    </div>
  );
};

export default Dashboard;


// export default Dashboard;
// 'use client';
// import React from 'react';
// import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import Typography from '@mui/material/Typography';
// import { db } from '@/lib/prisma';

// export const getAHTData = async () => {
//   const ahtData = await db.ticket.findMany({
//     select: {
//       createdAt: true,
//       updatedAt: true,
//       status: true,
//     },
//     where: {
//       status: 'CLOSED',
//     },
//   });

//   const customerSatisfaction = await db.review.aggregate({
//     _avg: {
//       stars: true,
//     },
//   });

//   const userReviews = await db.review.findMany({
//     select: {
//       review: true,
//       stars: true,
//     },
//     take: 3,
//   });

//   const ahtByMonth = {};

//   ahtData.forEach((ticket) => {
//     const createdMonth = ticket.createdAt.toISOString().slice(0, 7);
//     const closedMonth = ticket.updatedAt.toISOString().slice(0, 7);

//     if (!ahtByMonth[createdMonth]) {
//       ahtByMonth[createdMonth] = [];
//     }

//     if (!ahtByMonth[closedMonth]) {
//       ahtByMonth[closedMonth] = [];
//     }

//     ahtByMonth[createdMonth].push(ticket);
//     ahtByMonth[closedMonth].push(ticket);
//   });

//   const formattedData = Object.entries(ahtByMonth).map(([month, tickets]) => {
//     const openedTickets = tickets.filter((ticket) => ticket.status === 'SUBMITTED');
//     const closedTickets = tickets.filter((ticket) => ticket.status === 'CLOSED');

//     const totalOpenTime = openedTickets.reduce((acc: number, ticket: { createdAt: string | number | Date; }) => {
//       const createdAt = new Date(ticket.createdAt);
//       return acc + createdAt.getTime();
//     }, 0);

//     const totalClosedTime = closedTickets.reduce((acc: number, ticket: { updatedAt: string | number | Date; }) => {
//       const updatedAt = new Date(ticket.updatedAt);
//       return acc + updatedAt.getTime();
//     }, 0);

//     const totalOpenTickets = openedTickets.length;
//     const totalClosedTickets = closedTickets.length;

//     const averageOpenTime = totalOpenTickets > 0 ? totalOpenTime / totalOpenTickets : 0;
//     const averageClosedTime = totalClosedTickets > 0 ? totalClosedTime / totalClosedTickets : 0;

//     const aht = Math.round((averageClosedTime - averageOpenTime) / (1000 * 60 * 60 * 24));

//     return {
//       name: month,
//       AHT: aht,
//     };
//   });

//   return {
//     ahtData: formattedData,
//     customerSatisfaction: customerSatisfaction._avg.stars,
//     userReviews,
//   };
// };

// const Dashboard = async () => {
//   const { ahtData, customerSatisfaction, userReviews } = await getAHTData();
//   const averageAHT = Math.round(ahtData.reduce((acc, current) => acc + current.AHT, 0) / ahtData.length);

//   return (
//     <div className='grid lg:grid-cols-2 xl:grid-cols-4 gap-6 mb-8'>
//       <div className='col-span-full flex flex-col xl:flex-row space-y-6 xl:space-y-0 xl:space-x-6'>
//         <div className='bg-indigo-200 rounded-xl border border-gray-200 px-8 pt-0pb-6 w-full'>
//           <div className='grid lg:grid-rows-2 gap-0 items-center h-full w-full flex-1'>
//             <div className='flex flex-col'>
//               <h1 className='text-3xl xl:text-3xl text-indigo-800 font-semibold mb-2'>
//                 Analytical Dashboard
//               </h1>
//               <p className='font-medium'>Monitor and analyze customer service performance.</p>
//             </div>
//             <div className='flex justify-center items-start'>
//               <LineChart width={300} height={200} data={ahtData}>
//                 <Line type="monotone" dataKey="AHT" stroke="#8884d8" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
//                 <Tooltip />
//               </LineChart>
//             </div>
//           </div>
//         </div>

//         <div className='bg-white rounded-xl border border-gray-200 px-8 pt-2 pb-4 flex-none flex items-center justify-center'>
//           <Typography variant="h4" align="center">
//             <span className='text-indigo-800 font-semibold'>CSAT: </span>
//             {Math.round(Number(customerSatisfaction))}
//           </Typography>
//         </div>
//         <div className='bg-white rounded-xl border border-gray-200 px-8 pt-2 pb-4 flex-none flex items-center justify-center'>
//           <Typography variant="h4" align="center">
//             <span className='text-indigo-800 font-semibold'>AHT: </span>
//             {averageAHT}
//           </Typography>
//         </div>
//       </div>

//       <div className='col-span-full bg-white rounded-xl border border-gray-200 px-8 pt-4 pb-6'>
//         <h2 className='text-xl text-indigo-800 font-semibold mb-4'>User Reviews</h2>
//         {userReviews.map((review) => (
//           <div key={review.stars} className='mb-4'>
//             <div className='flex items-center mb-2'>
//               {Array.from({ length: review.stars }, (_, i) => (
//                 <span key={i} className='text-indigo-700'>&#9733;</span>
//               ))}
//               {Array.from({ length: 5 - review.stars }, (_, i) => (
//                 <span key={i} className='text-gray-400'>&#9733;</span>
//               ))}
//             </div>
//             <p>"{review.review}"</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;