const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? process.env.PUBLISHABLE_KEY_LIVE
  : process.env.PUBLISHABLE_KEY;
 
export default STRIPE_PUBLISHABLE;