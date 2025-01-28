import React, { useState, useEffect } from "react";
import { getAllOrders,updateOrderStatusAdmin } from "../Apis/orderAPI";

export default function OrderList() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  useEffect(() => {
    
    async function fetchOrders() {
      try {
        
        const orderdetails = await getAllOrders();
        console.log(orderdetails); 
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

  const handleStatusChange = async (orderId, newStatus) => {
    try {
     
      const updatedOrder = await updateOrderStatusAdmin(orderId, newStatus);
      
      window.location.reload();
      console.log('Order updated successfully:', updatedOrder);
      
    } catch (error) {
      console.error('Failed to update order status:', error);
      alert('Failed to update the status. Please try again.');
    }
  };
  

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <h1 className="text-4xl md:text-5xl font-bold text-center my-4 text-orange-500 py-6 mt-4 uppercase tracking-wide shadow-md bg-white rounded-lg max-w-4xl mx-auto">
    Remaining Orders
  </h1>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {orders
      .filter((order) => order.status !== 'Completed') // Filter out completed orders
      .map((order) => (
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
          <div className="text-lg font-semibold text-gray-800">
            <label htmlFor={`status-${order._id}`} className="text-lg font-semibold mr-2">
              Status:
            </label>
            <select
              id={`status-${order._id}`}
              className="border border-gray-300 rounded px-2 py-1 text-gray-800"
              value={order.status}
              onChange={(e) => handleStatusChange(order._id, e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
              <option value="Shipped">Shipped</option>
              <option value="Canceled">Canceled</option>
            </select>
          </div>
        </div>
      ))}
  </div>
</div>

  );
}
