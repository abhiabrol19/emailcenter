const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
  googleId: String,
  credits: { type: Number, default: 0 },
  stripeCustomerId: { type: String, default: null },
});

mongoose.model('users', userSchema);
