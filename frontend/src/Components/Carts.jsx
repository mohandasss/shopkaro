import { useEffect, useState } from "react";
import Cart from "./Cart";
import { getLoggedInUserProfile } from "../Apis/userAPI"; // Ensure this function is correctly implemented
import { getCart , removeFromCart } from "../Apis/cartAPI"; // Assuming getCart fetches the cart for the user; // Import the removeFromCart function

const Carts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfileAndCart = async () => {
      try {
        const userProfile = await getLoggedInUserProfile();
        const cartData = await getCart(userProfile.userId);
        setCartItems(cartData.items);
        console.log(cartData.items);
        
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
      setCartItems(updatedCart.items); // Update the cart items with the latest data from the backend
    } catch (error) {
      console.error("Error removing item:", error);
      setError("Failed to remove item from cart");
    }
  };

  const subtotal = Array.isArray(cartItems)
  ? cartItems.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)
  : 0;


  const total = subtotal + shippingCost;

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <Cart
                key={item.productId}
                name={item.productId.name}
                description={item.productId.description}
                image={item.productId.imageURL}
                price={item.productId.price}
                quantity={item.quantity}
                removeItem={handleRemoveFromCart} // Pass the handler to Cart component
                productId={item.productId} // Pass the productId to remove item
              />
            ))
          ) : (
            <p className="text-center text-gray-700">Your cart is empty.</p>
          )}
        </div>

        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
  <div className="mb-2 flex justify-between">
    <p className="text-gray-700">Subtotal</p>
    <p className="text-gray-700">
      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(subtotal)}
    </p>
  </div>
  <div className="flex justify-between">
    <p className="text-gray-700">Shipping</p>
    <p className="text-gray-700">
      {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(shippingCost)}
    </p>
  </div>
  <hr className="my-4" />
  <div className="flex justify-between">
    <p className="text-lg font-bold">Total</p>
    <div>
      <p className="mb-1 text-lg font-bold">
        {new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(total)}
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
