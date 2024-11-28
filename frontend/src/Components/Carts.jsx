import Cart from "./Cart";
import { useState } from "react";
import preview from "../assets/preview.png"

const Carts = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Nike Air Max 2019",
      size: "36EU - 4US",
      image: "https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?auto=format&fit=crop&w=1170&q=80",
      price: 259000,
      quantity: 2,
    },
    {
      id: 2,
      name: "Nike Air Max 2019",
      size: "36EU - 4US",
      image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?auto=format&fit=crop&w=1131&q=80",
      price: 259000,
      quantity: 2,
    },
  ]);

  const shippingCost = 4999;

  const updateQuantity = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };
  ;

  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + shippingCost;

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items Section */}
        <div className="rounded-lg md:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Cart
                key={item.id}
                name={item.name}
                size={item.size}
                image={item.image}
                price={item.price}
                quantity={item.quantity}
                updateQuantity={updateQuantity} 
                removeItem={removeItem} 
              />
            ))
          ) : (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          )}
        </div>

        {/* Subtotal Section */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "LAK" }).format(subtotal)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              {new Intl.NumberFormat("en-US", { style: "currency", currency: "LAK" }).format(shippingCost)}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                {new Intl.NumberFormat("en-US", { style: "currency", currency: "LAK" }).format(total)}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carts;
