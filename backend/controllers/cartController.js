// controllers/cartController.js
const Cart = require('../models/Cart');
const Order = require('../models/Order');

const addToCart = async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [{ productId, quantity }] });
    } else {
      const itemIndex = cart.items.findIndex(item => item.productId.toString() === productId);
      if (itemIndex >= 0) {
        cart.items[itemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
    }
    await cart.save();
    res.json({message:"Added to cart",cart});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.params.userId }).populate('items.productId');
    if (!cart) return res.status(404).json({ message: 'Cart not found' });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeFromCart = async (req, res) => {
  try {
    const { userId, productId } = req.body;

    // Find the cart for the given userId
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    // Filter out the item with the matching productId
    cart.items = cart.items.filter(item => item.productId.toString() !== productId.toString());

    // Save the updated cart to the database
    await cart.save();

    // Send the updated cart as the response
    res.json({ message: 'Removed from cart', cart });
  } catch (error) {
    console.error('Error in removeFromCart:', error.message);
    res.status(500).json({ error: error.message });
  }
};


// controllers/cartController.js
const updateCart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity } = req.body;  // Assuming you pass productId and the new quantity
  
  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }
    
    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    item.quantity = quantity;  // Update the quantity of the product in the cart
    await cart.save();
    
    

    res.json({ message: 'Cart updated successfully', cart });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// controllers/cartController.js
const checkoutCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }
    
    // Assume some payment gateway logic here

    // After payment success, create an order
    const order = new Order({
      userId,
      items: cart.items,
      total: cart.total,
      status: 'Pending',
    });

    await order.save();
    cart.items = [];  // Empty the cart after successful checkout
    await cart.save();

    res.json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};






module.exports = {
  addToCart,
  getCart,
  removeFromCart,
  updateCart,
  checkoutCart
};
