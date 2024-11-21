const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Category name is required.'],
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Reference to Product model
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Category', categorySchema);
