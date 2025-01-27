"use client";

import React, { useEffect, useState } from "react";
import {fetchDashboardData,fetchTotalUsers} from "../Apis/AdminAPI";
import {
    getTotalSales} from "../Apis/orderAPI"
    import OrderList from "./OrderList";
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [totalusers, settotalusers] = useState(null);
  const [totalsales, settotalsales] = useState(null);
  
  const [error, setError] = useState(null);

  


  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        const TotalUsers = await fetchTotalUsers();
        const sales = await getTotalSales();
       
        
        
      
        settotalsales(sales.totalSales); 
        
        setDashboardData(data);
        console.log(data);
        settotalusers(TotalUsers);
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);
  

  if (error) {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg" role="alert">
        <strong className="font-medium">Error:</strong> {error}
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Orders</h2>
      <p className="text-4xl font-bold text-blue-600">{dashboardData.totalOrders}</p>
    </div>

    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Active Users</h2>
      <p className="text-4xl font-bold text-green-600">{totalusers}</p>
    </div>

    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">Total Revenue</h2>
      <p className="text-4xl font-bold text-purple-600">₹{totalsales}</p>
    </div>

    
  </div>

  {/* The OrderList component */}
  <OrderList />
</div>

  );
}
