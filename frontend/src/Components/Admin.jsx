"use client";

import React, { useState } from "react";
import Dashboard from "./Dashboard";

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
          </div>

          {/* Tabs Content */}
          <div className="mt-6">
            {activeTab === "dashboard" && <Dashboard />}
          </div>
        </div>
      </main>
    </div>
  );
}
