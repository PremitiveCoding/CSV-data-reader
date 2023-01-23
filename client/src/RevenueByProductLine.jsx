import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis } from 'recharts';

const RevenueByProductLine = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('/revenue-by-product-line')
      .then(res => res.json())
      .then(result => setData(result));
  }, []);

  return (
    <BarChart width={600} height={300} data={data}>
      <XAxis dataKey="_id" />
      <YAxis />
      <Bar dataKey="totalRevenue" fill="#82ca9d" />
    </BarChart>
  );
};
