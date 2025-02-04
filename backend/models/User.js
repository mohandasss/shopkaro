const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    validate: {
      validator: function(v) {
        return /^\d{10}$/.test(v); // Ensures it's exactly 10 digits
      },
      message: props => `${props.value} is not a valid phone number!`
    }
  },
  role: { type: String, default: 'customer' },
  address: { type: String },
  orderHistory: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }]
});

// Hash password **only if modified** before saving
userSchema.pre('save', async function(next) {
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});


module.exports = mongoose.model('User', userSchema);
