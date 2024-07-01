// services/stripe.js
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

const stripe = require('stripe')(keys.stripeSecretKey, {
  apiVersion: '2023-10-16',
});

async function createCustomer(userId) {
  const newCustomer = await stripe.customers.create({
    metadata: {
      userId: userId.toString(),
    },
  });

  console.log(
    'Updating user:',
    userId,
    'with Stripe Customer ID:',
    newCustomer.id
  );

  try {
    const user = await User.findOneAndUpdate(
      { _id: userId },
      { stripeCustomerId: newCustomer.id },
      { new: true } // This option returns the updated document
    );
    console.log('Updated user:', user);
  } catch (err) {
    console.error('Error updating user:', err);
  }

  return newCustomer;
}

async function retrieveSession(sessionId) {
  return await stripe.checkout.sessions.retrieve(sessionId);
}

async function createCheckoutSession(domainURL, price, userId) {
  const customer = await createCustomer(userId);

  return await stripe.checkout.sessions.create({
    customer: customer.id,
    mode: 'payment',
    line_items: [
      {
        price: keys.price,
        quantity: 1,
      },
    ],
    //success_url: `${domainURL}/success?session_id={CHECKOUT_SESSION_ID}`,
    success_url: `${domainURL}/surveys`,
    cancel_url: `${domainURL}/canceled`,
  });
}

function constructWebhookEvent(rawBody, signature, secret) {
  return stripe.webhooks.constructEvent(rawBody, signature, secret);
}

module.exports = {
  retrieveSession,
  createCheckoutSession,
  constructWebhookEvent,
};
