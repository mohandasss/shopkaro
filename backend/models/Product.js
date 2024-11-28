const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
     
      trim: true 
    },
    description: { 
      type: String, 
      trim: true 
    },
    price: { 
      type: Number, 
     
      min: [0, 'Price cannot be negative.'] 
    },
    category: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', // Reference to Category model
      required: [true, 'Category is required.'] 
    },
    quantity: { 
      type: Number, 
      default: 0, 
      min: [0, 'Quantity cannot be negative.'] 
    },
    imageURL: { 
      type: String, 
      validate: {
        validator: function (v) {
          return /^https?:\/\/.+\.(jpg|jpeg|png|webp|gif)$/.test(v); // Validate image URL format
        },
        message: props => `${props.value} is not a valid image URL.`
      }
    },
    rating: { 
      type: Number, 
      default: 0, 
      min: [0, 'Rating cannot be negative.'], 
      max: [5, 'Rating cannot exceed 5.'] 
    },
    reviews: [
      {
        userId: { 
          type: mongoose.Schema.Types.ObjectId, 
          ref: 'User', 
          required: true 
        },
        rating: { 
          type: Number, 
          required: true, 
          min: [1, 'Rating must be at least 1.'], 
          max: [5, 'Rating cannot exceed 5.'] 
        },
        comment: { 
          type: String, 
          required: true, 
          trim: true 
        }
      }
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Product', productSchema);
