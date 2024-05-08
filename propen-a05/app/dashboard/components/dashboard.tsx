import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

// Dummy data for AHT
const ahtData = [
  { date: '2023-01-01', value: 180 },
  { date: '2023-01-02', value: 195 },
  { date: '2023-01-03', value: 210 },
  { date: '2023-01-04', value: 225 },
  { date: '2023-01-05', value: 240 },
  { date: '2023-01-06', value: 255 },
  { date: '2023-01-07', value: 270 },
];

// Dummy data for CSAT
const csatData = [90, 88, 92, 85, 93, 91, 87];

// Dummy data for NPS
const npsData = [65, 72, 68, 75, 61, 69, 73];

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="tile">
        <h3>Average Handling Time (AHT)</h3>
        <LineChart width={600} height={400} data={ahtData}>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
        <p>
          Average Time: <span className="uppercase">{ahtData[ahtData.length - 1].value} SECONDS</span>
        </p>
      </div>
      <div className="tile">
        <h3>Customer Satisfaction (CSAT)</h3>
        <ul>
          {csatData.map((score, index) => (
            <li key={index}>{score}%</li>
          ))}
        </ul>
      </div>
      <div className="tile">
        <h3>Net Promoter Score (NPS)</h3>
        <ul>
          {npsData.map((score, index) => (
            <li key={index}>{score}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;