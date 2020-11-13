const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const { join } = require("path");
const cors = require('cors');
const bodyParser = require('body-parser');
const CORS_WHITELIST = require('./constants/frontend');

const port = process.env.PORT || 3001;
// const SERVER_CONFIGS = require('./constants/server');
// const configureRoutes = require('./routes');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(logger("dev"));

 
const corsOptions = {
  origin: (origin, callback) =>
    (CORS_WHITELIST.indexOf(origin) !== -1)
      ? callback(null, true)
      : callback(new Error('Not allowed by CORS'))
};
 
const configureServer = app => {
  app.use(cors(corsOptions));
 
  app.use(bodyParser.json());
};
 
module.exports = configureServer;
const app = express();
let MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/";

mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {useNewUrlParser: true});
if (process.env.NODE_ENV === "production") {
  app.use(express.static("build"));
}

app.get("/", (req, res) => {
  res.send("Add your Stripe Secret Key to the .require('stripe') statement!");
});

app.post("/checkout", async (req, res) => {
  console.log("Request:", req.body);

  let error;
  let status;
  try {
    const { product, token } = req.body;

    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    });

    const idempotency_key = uuid();
    const charge = await stripe.charges.create(
      {
        amount: product.price * 100,
        currency: "usd",
        customer: customer.id,
        receipt_email: token.email,
        description: `Purchased the ${product.name}`,
        shipping: {
          name: token.card.name,
          address: {
            line1: token.card.address_line1,
            line2: token.card.address_line2,
            city: token.card.address_city,
            country: token.card.address_country,
            postal_code: token.card.address_zip
          }
        }
      },
      {
        idempotency_key
      }
    );
    console.log("Charge:", { charge });
    status = "success";
  } catch (error) {
    console.error("Error:", error);
    status = "failure";
  }

  res.json({ error, status });
});
// configureRoutes(app);
 
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

app.listen(port, () => console.log(`Server listening on port ${port}`));
