import { useEffect, useState } from "react";
import Cart from "./Cart";
import { getLoggedInUserProfile } from "../Apis/userAPI";
import { getCart, removeFromCart } from "../Apis/cartAPI";
import Loader from "./Loader";
import RazorpayCheckout from "./RazorpayCheckout";

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfileAndCart = async () => {
      try {
        const userProfile = await getLoggedInUserProfile();
        const cartData = await getCart(userProfile.userId);

        // Filter out items with a null productId
        const validItems = cartData.items.filter((item) => item.productId !== null);
        setCartItems(validItems);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching cart:", error);
        setError("Failed to load cart");
        setLoading(false);
      }
    };

    fetchUserProfileAndCart();
  }, []);

  const shippingCost = 60;

  const handleRemoveFromCart = async (productId) => {
    try {
      const userProfile = await getLoggedInUserProfile();
      const updatedCart = await removeFromCart(userProfile.userId, productId);

      // Filter out invalid items again after removal
      const validItems = updatedCart.items.filter((item) => item.productId !== null);
      setCartItems(validItems);
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart");
    }
  };

  // Calculate subtotal (exclude invalid items)
  const subtotal = Array.isArray(cartItems)
    ? cartItems.reduce(
        (acc, item) => acc + (item.productId?.price || 0) * item.quantity,
        0
      )
    : 0;

  const total = subtotal + shippingCost;

  if (loading) return <Loader />;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items Section */}
        <div className="rounded-lg md:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.productId?._id}>
                <Cart
                  id={item.productId?._id}
                  name={item.productId?.name || "Unknown Product"}
                  description={item.productId?.description || "No description available"}
                  image={item.productId?.imageURL || "placeholder.jpg"}
                  price={item.productId?.price || 0}
                  quantity={item.quantity}
                  removeItem={handleRemoveFromCart}
                  productId={item.productId?._id}
                />
              </div>
            ))
          ) : (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          )}
        </div>

        {/* Order Summary Section */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(subtotal)}
            </p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">
              {new Intl.NumberFormat("en-IN", {
                style: "currency",
                currency: "INR",
              }).format(shippingCost)}
            </p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div>
              <p className="mb-1 text-lg font-bold">
                {new Intl.NumberFormat("en-IN", {
                  style: "currency",
                  currency: "INR",
                }).format(total)}
              </p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>

          {/* Pass cart details to RazorpayCheckout */}
          <RazorpayCheckout
            totalAmount={total}
            subtotal={subtotal}
            cartItems={cartItems}
            shippingCost={shippingCost}
          />
        </div>
      </div>
    </div>
  );
};

export default Carts;
