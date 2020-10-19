const configureStripe = require('stripe');
 
const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? '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'
    : 'sk_test_51Hbf1mExXOpK3cOruAO41I1L7faBEIUa8D54hYLqqzLMkNnHYrRgTMZdvEI2wSDXXKQ7DS3qlMGUSn68LmqVlenO002xZrHrLk';
 
const stripe = configureStripe(STRIPE_SECRET_KEY);
 
module.exports = stripe;