# EmailCenter

## Overview

EmailCenter is a robust email sending application that enables users to send emails after signing in with their Google account. The application integrates OAuth for secure login and Stripe for payment processing, allowing users to purchase credits that can be used to send emails.

## Features

- **OAuth Authentication**: Secure user login via Google.
- **Stripe Integration**: Users can purchase email credits through Stripe.
- **Email Sending**: Utilize credits to send emails to specified recipients.
- **CI/CD**: Automated deployment with CircleCI.
- **Hosting**: Application hosted on Render.

## Architecture

The application is built using:

- **Backend**: Node.js with Express for the server-side logic.
- **Frontend**: React for the user interface & Redux state management.
- **Database**: MongoDB for data persistence.
- **Payments**: Stripe for handling transactions.
- **Authentication**: Google OAuth 2.0 for secure sign-in.
- **Deployment**: Render for hosting, with CI/CD pipeline managed via CircleCI.

## LIVE DEMO

Visit https://emaily-8stb.onrender.com/ to access the live demonstration of the app. This is free tier application so might take some additional time to load due to cold starting containers.

Once in, Click on 'Login with Google' to sign up. Upon successful sign up, you will be redirected back to the Dashboard.

The first step is to add some credits to your profile, select 'Add Credits' from the navigation tab and use the demo card details to load 5 credits to your account.

Name : Your Name
Email: Your Email
Card Number: 4242 4242 4242 4242
Exp: 4/44
CVC: 444

You will be redirected back to the dashboard. Click on the '+' icon on the bottom right of your screen to start a survey.

Fill in the form, use comma separator for additional email addresses and send the survey.

Check your spam folder in case the email is not received in the Inbox.

You can also record email responses by clicking yes or no in the email that you receive. This data is then published to the server via webhooks and resposes received can be seen on the survey tile once you refresh the window.

## Environment Variables Required:

googleClientID,
googleClientSecret,
mongoURI,
cookieKey,
stripePublishableKey,
stripeSecretKey,
price: SETUP A PRICE OBJECT ON STRIPE(TEST ONLY),
STATIC_DIR: '../client',
CLIENT_DOMAIN: 'http://localhost:5173',
STRIPE_WEBHOOK_SECRET,
sendgridKey
