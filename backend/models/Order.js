const mongoose = require('mongoose');
const User = require("../models/User");
const Product = require("../models/Product");

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, default: 'Pending' },
  orderDate: { type: Date, default: Date.now },
  razorpay_payment_id: { type: String },
  razorpay_order_id: { type: String },
  razorpay_signature: { type: String },
});

module.exports = mongoose.model('Order', orderSchema);
