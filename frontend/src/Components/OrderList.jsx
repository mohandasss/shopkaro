import React, { useState, useEffect } from "react";
import { getAllOrders } from "../Apis/orderAPI";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    async function fetchOrders() {
      try {
        
        const orderdetails = await getAllOrders();
        console.log(orderdetails); // Check if orders are fetched correctly
        setOrders(orderdetails); 
        
      } catch (error) {
        setError("Error fetching orders: " + error.message);
        console.error("Error fetching orders:", error);
      } finally {
        setLoading(false); 
      }
    }

    fetchOrders(); 
  }, []); 

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {orders.map((order) => (
          <div
            key={order._id}
            className="bg-white shadow-lg rounded-lg p-4 sm:p-6 border-2 border-gray-200 flex flex-col justify-between"
          >
            {/* Loop through items to display product images */}
            <div className="relative w-full h-64 overflow-hidden mb-4">
              {order.items && order.items.map((item, index) => (
                item.productId && item.productId.imageURL ? (
                  <img
                    key={index}
                    src={item.productId.imageURL}
                    alt={item.productId.name}
                    className="w-full h-full object-cover rounded-lg z-20"
                  />
                ) : (
                  <div key={index} className="text-center text-gray-500">No image available</div>
                )
              ))}
            </div>

            {/* Product Name */}
            <h1 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              {order.items && order.items[0]?.productId?.name}
            </h1>

            {/* Total Amount */}
            <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-4">
              Total Amount: ₹{order.totalAmount}
            </h2>

            {/* Status */}
            <p
              className={`text-base sm:text-lg font-bold ${
                order.status === "Pending"
                  ? "text-yellow-600"
                  : order.status === "Completed"
                  ? "text-green-600"
                  : order.status === "Shipped"
                  ? "text-blue-600"
                  : "text-red-600"
              }`}
            >
                <p className="text-lg font-semibold text-gray-800">
  <span className="text-xl font-bold text-indigo-600">Total Quantity:</span> {order.items.length}
</p>

              Status: {order.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
