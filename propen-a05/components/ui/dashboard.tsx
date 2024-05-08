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
