import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import { removeFromCart } from "../Apis/cartAPI";
import Popup from "./popup";

const Cart = ({ image, id, name, description, quantity, price }) => {
  const [popupMessage, setPopupMessage] = useState("");
  const [show, setShow] = useState(false);
  const [currentQuantity, setCurrentQuantity] = useState(quantity);

  const removeItem = async (id) => {
    try {
      const userdata = await getLoggedInUserProfile();
      const userId = userdata._id;
      const response = await removeFromCart(userId, id);
      setShow(true);
      setPopupMessage("Successfully removed from cart");

      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (error) {
      console.error("Error removing item:", error.response?.data || error.message);
    }
  };

  // Automatically hide the popup after 2 seconds
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        setShow(false);
      }, 2000);
    }
  }, [show]);

  return (
    <div className="mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={image}
        alt={name}
        className="w-full rounded-lg sm:w-40 sm:h-40 object-cover"
      />
      <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div className="mt-5 sm:mt-0">
          <h2 className="text-lg font-semibold text-gray-900">{name}</h2>
          <p className="mt-1 text-sm text-gray-700">{description}</p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:flex-col sm:justify-between">
          <div className="flex items-center space-x-4 sm:space-x-6">
            <p className="text-xl text-gray-900 font-semibold">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(price)}
            </p>

            <span className="text-xl font-semibold text-purple-500">
              x{currentQuantity}
            </span>

            <div
              className="cursor-pointer p-2 bg-red-100 rounded-full hover:bg-red-200 transition-colors"
              onClick={() => removeItem(id)}
            >
              <RxCross2 size={25} className="text-red-600" />
            </div>
          </div>
        </div>
      </div>
      <Popup message={popupMessage} isVisible={show} />
    </div>
  );
};

export default Cart;
