"use client";

import React, { useState } from "react";
import Dashboard from "./Dashboard";
import SearchOrder from "./SearchOrder"; // Import the new component
import UserTab from "./UserTab";
import AddProduct from "./AddProduct";
import Products from "./Products";

export default function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Panel</h1>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Tabs List */}
          <div className="flex border-b border-gray-300">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === "dashboard"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("dashboard")}
            >
              Dashboard
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ml-4 ${
                activeTab === "searchOrder"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("searchOrder")}
            >
              Search Order
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ml-4 ${
                activeTab === "userTab"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("userTab")}
            >
              Users
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ml-4 ${
                activeTab === "AddProduct"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("AddProduct")}
            >
              AddProduct
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ml-4 ${
                activeTab === "Products"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("Products")}
            >
              Products
            </button>
          </div>

          {/* Tabs Content */}
          <div className="mt-6 flex justify-center gap-4">
            <div
              className={`w-full ${
                activeTab === "dashboard" || activeTab === "searchOrder"
                  ? "md:w-full"
                  : "md:w-2/3"
              } flex justify-center`}
            >
              {activeTab === "dashboard" && <Dashboard />}
              {activeTab === "searchOrder" && <SearchOrder />}
              {activeTab === "userTab" && <UserTab />}
              {activeTab === "AddProduct" && <AddProduct />}
              {activeTab === "Products" && <Products />}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
