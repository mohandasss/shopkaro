import React, { useState } from "react";
import { getOrderById } from "../Apis/orderAPI";

const SearchOrder = () => {
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState(null);
  const [error, setError] = useState("");

  const handleOrderId = (e) => {
    e.preventDefault();
    const orderIdValue = e.target.value;
    setOrderId(orderIdValue);
  };

  const handleSearch = async () => {
    try {
      const orderData = await getOrderById(orderId);
      setOrder(orderData); // Set the fetched order data to state
      setError(""); // Clear previous errors
    } catch (error) {
      setError("Order not found");
      setOrder(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4">
          Search Order
        </h2>
        <div className="space-y-4">
          <input
            type="text"
            value={orderId}
            onChange={handleOrderId}
            placeholder="Enter Order ID or Details"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSearch}
            className="w-full py-3 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Search
          </button>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {order && (
            <div className="mt-4 space-y-6">
              <h3 className="text-lg font-semibold text-gray-800">Order Details</h3>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Order ID:</h4>
                <p className="font-medium">{order._id}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Order Date:</h4>
                <p className="font-medium">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Status:</h4>
                <p className="font-medium">{order.status}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Total Amount:</h4>
                <p className="font-medium">₹{order.totalAmount}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Razorpay Payment ID:</h4>
                <p className="font-medium">{order.razorpay_payment_id}</p>
              </div>

              <div className="bg-gray-100 p-4 rounded-lg">
                <h4 className="text-sm text-gray-600">Razorpay Order ID:</h4>
                <p className="font-medium">{order.razorpay_order_id}</p>
              </div>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-gray-800">Items:</h4>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="bg-gray-100 p-4 rounded-lg">
                      <h5 className="font-medium text-gray-800">{item.productId.name}</h5>
                      <div className="text-sm text-gray-600">
                        <p>Price: ₹{item.productId.price}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Total: ₹{item.productId.price * item.quantity}</p>
                      </div>
                      <img
                        src={item.productId.imageURL}
                        alt={item.productId.name}
                        className="mt-2 w-32 h-32 object-cover rounded-md"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchOrder;
