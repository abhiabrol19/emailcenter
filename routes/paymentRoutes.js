const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const keys = require('../config/keys'); // assuming keys.js is in a config directory
const mongoose = require('mongoose');
const User = mongoose.model('users');
const {
  retrieveSession,
  createCheckoutSession,
  constructWebhookEvent,
} = require('../services/stripe');

router.get('/checkout-session', async (req, res) => {
  const { sessionId } = req.query;
  const session = await retrieveSession(sessionId);
  res.send(session);
});

router.post('/create-checkout-session', async (req, res) => {
  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }
  console.log('User:', req.user);
  const domainURL = keys.CLIENT_DOMAIN;
  const session = await createCheckoutSession(
    domainURL,
    keys.price,
    req.user._id
  );
  return res.json({ url: session.url });
});

router.post(
  '/payment/webhook',
  bodyParser.raw({ type: 'application/json' }),
  async (req, res) => {
    console.log('Webhook received');
    let event;
    let signature = req.headers['stripe-signature'];
    try {
      event = constructWebhookEvent(
        req.rawBody,
        signature,
        keys.STRIPE_WEBHOOK_SECRET
      );
    } catch (err) {
      console.log(`⚠️  Webhook signature verification failed: ${err.message}`);
      return res.sendStatus(400);
    }

    console.log(`Event type: ${event.type}`);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      await handleCheckoutSession(session);
    } else if (event.type === 'checkout.session.expired') {
      // const session = event.data.object;
      // handleExpiredSession(session);

      console.log('Checkout session expired');
    }

    res.json({ received: true });
  }
);

async function handleCheckoutSession(session) {
  console.log('Checkout session succeeded:', session);
  const stripeCustomerId = session.customer;

  // Retrieve the user from the database using the Stripe Customer ID
  const user = await User.findOne({ stripeCustomerId });

  if (user) {
    // Calculate the amount spent (assuming the amount_total is in cents)
    const amountSpent = session.amount_total / 100; // Convert to dollars

    // Update the user's credits
    user.credits = (user.credits || 0) + amountSpent;
    //user.paymentStatus = 'completed';
    //user.paymentId = session.payment_intent;

    // Save the updated user information
    await user.save();
    console.log('User record updated with new credits:', user);
  } else {
    console.log(`User with Stripe Customer ID ${stripeCustomerId} not found.`);
  }
}

module.exports = router;
