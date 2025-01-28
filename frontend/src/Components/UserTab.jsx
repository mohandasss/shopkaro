import React, { useEffect, useState } from "react";
import { fetchTotalUsers } from "../Apis/AdminAPI";

const UserTab = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const totalUsers = await fetchTotalUsers();
        setUsers(totalUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {users.map((user, index) => (
        <div
          key={index}
          className="bg-white shadow-lg rounded-lg p-6 mb-4"
        >
          <h1 className="text-xl font-semibold text-gray-800">{user.name}</h1>
          <p className="text-sm text-gray-600">
  Email: {user.email.length > 20 ? `${user.email.substring(0, 20)}...` : user.email}
</p>

          <p className="text-sm text-gray-600">Role: {user.role}</p>
          <p className="text-sm text-gray-600">Address: {user.address}</p>
          <p className="text-sm text-gray-600">
            Order History: {user.orderHistory.length > 0 ? user.orderHistory.length : 'No orders yet'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default UserTab;
