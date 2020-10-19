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
// configureRoutes(app);
 
app.use(morgan("dev"));
app.use(helmet());
app.use(express.static(join(__dirname, "build")));

app.listen(port, () => console.log(`Server listening on port ${port}`));
