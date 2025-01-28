"use client";

import React, { useEffect, useState } from "react";
import { fetchDashboardData, fetchTotalUsers } from "../Apis/AdminAPI";
import { getTotalSales,getAllOrders } from "../Apis/orderAPI";
import OrderList from "./OrderList";
export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState(null);
  const [totalusers, settotalusers] = useState(null);
  const [totalsales, settotalsales] = useState(null);
  const [complete, setcomplete] = useState(null);

  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchDashboardData();
        const TotalUsers = await fetchTotalUsers();
        const sales = await getTotalSales();
         const completedorders = await getAllOrders();
         console.log(completedorders[0].status);
         
        settotalsales(sales.totalSales);
        setcomplete(completedorders)
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
      <div
        className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
        role="alert"
      >
        <strong className="font-medium">Error:</strong> {error}
      </div>
    );
  }

  if (!dashboardData) {
    return <div className="text-center">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
    {/* Total Orders Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Total Orders</h2>
      <p className="text-3xl font-bold text-blue-600">{dashboardData.totalOrders}</p>
    </div>

    {/* Active Users Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Active Users</h2>
      <p className="text-3xl font-bold text-green-600">{totalusers.length}</p>
    </div>

    {/* Total Revenue Card */}
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
      <h2 className="text-lg font-semibold text-gray-700 mb-3">Total Revenue</h2>
      <p className="text-3xl font-bold text-purple-600">₹{totalsales}</p>
    </div>
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col justify-between">
  <h2 className="text-lg font-semibold text-gray-700 mb-3">Orders Completed</h2>
  <p className="text-3xl font-bold text-green-600">
    {complete.filter(order => order.status === "Completed").length}
  </p>
</div>

  </div>

  {/* The OrderList component */}
  <div className="mt-8">
    <OrderList />
  </div>
</div>

  );
}
