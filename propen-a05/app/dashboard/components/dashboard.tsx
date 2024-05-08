// dashboard.tsx
'use client'
import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import Tile  from './Tile';

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
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h2" align="center">
          Analytical Dashboard
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Tile title="Average Handling Time (AHT)">
          <LineChart width={300} height={200} data={data}>
            <Line type="monotone" dataKey="AHT" stroke="#8884d8" />
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <Tooltip />
          </LineChart>
          <Typography variant="h4" align="center">
            <span style={{ textTransform: 'uppercase' }}>
              {Math.round(data.reduce((acc, current) => acc + current.AHT, 0) / data.length)}
            </span>
          </Typography>
        </Tile>
      </Grid>
      <Grid item xs={4}>
        <Tile title="CSAT">
          <Typography variant="h4" align="center">
            85
          </Typography>
        </Tile>
      </Grid>
      <Grid item xs={4}>
        <Tile title="NPS">
          <Typography variant="h4" align="center">
            60
          </Typography>
        </Tile>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
