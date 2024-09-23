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
- **Authentication**: Google OAuth for secure sign-in.
- **Deployment**: Render for hosting, with CI/CD pipeline managed via CircleCI.

## LIVE DEMO

Visit https://emaily-8stb.onrender.com/ to access the live demonstration of the app. This is free tier application so might take some additianl time to load due to cold starting containers.

Once in, Click on 'Login with Google' to sign up. You will be redirected to the /surverys route where you can access the Dashboard functionality.

The first step is to add soome credits to your profile, select 'Add Credits' from thge navigation tab and use the demo card details to load 5 credits to your account.

Name : Your Name
Email: Your Email
Card Number: 4242 4242 4242 4242
Exp: 4/44
CVC: 444

You will be redirected back to the dashboard. Click on the '+' icon on the bottom alright of your screen to start a survey.

Fill in the form, use comma seperator for addtioanl email addresses and send the survey.

You can also record email responses by clicking yes or no in the email that you receive. This data is then published to the server via webhooks and resposes receied can be accessed on the survey tile once you refresh the window.

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

## HAPPY CODING :)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/abhiabrol19/emailcenter.git
   ```
