const configureStripe = require('stripe');
 
const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? process.env.SECRET_KEY_LIVE
    : process.env.SECRET_KEY;
 
const stripe = configureStripe(STRIPE_SECRET_KEY);
 
module.exports = stripe;