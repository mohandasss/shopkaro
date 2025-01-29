import { useEffect, useState } from "react";
import { getLoggedInUserProfile } from "../Apis/userAPI"; // Adjust API path as needed
import { getUserOrders } from "../Apis/orderAPI";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userProfile = await getLoggedInUserProfile();
        const userId = userProfile?._id;
        if (userId) {
          const userOrders = await getUserOrders(userId);
          setOrders(userOrders);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  return (
    <section className="py-24">
      <div className="w-full max-w-7xl px-4 md:px-5 mx-auto">
        <h2 className="font-bold text-4xl text-center text-black">Thanks for beliving in US</h2>
        <p className="mt-4 text-lg text-gray-500 text-center mb-11">
          Thank you for your purchase! Check your order summary below.
        </p>

        {orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl mb-6 p-6 shadow-sm"
          >
            <div className="flex justify-between items-center border-b pb-4 mb-4">
              <div>
                <p className="font-semibold text-lg text-black">
                  Order ID: <span className="text-indigo-600">{order.razorpay_order_id}</span>
                </p>
                <p className="text-gray-500 mt-2">Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
                <p className="text-gray-500 mt-2">Status: {order.status}</p>
              </div>
              <p className="font-semibold text-lg text-black">
                Total Amount: <span className="text-indigo-600">₹{order.totalAmount}</span>
              </p>
            </div>

            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start border-b pb-4 last:border-b-0"
                >
                  <img
                    src={item.productId.imageURL}
                    alt={item.productId.name}
                    className="w-24 h-24 object-cover rounded-md"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-xl text-black">
                      {item.productId.name}
                    </h3>
                    <p className="text-gray-500">Price: ₹{item.productId.price}</p>
                    <p className="text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {orders.length === 0 && (
          <p className="text-center text-gray-500">No orders found.</p>
        )}
      </div>
    </section>
  );
};

export default Orders;
