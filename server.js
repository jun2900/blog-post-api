require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));

//Main route
require("./routes/auth.routes")(app);
require("./routes/post.routes")(app);

app.listen(port, () => {
  console.log(`Your listening to http://localhost:${port}`);
});
