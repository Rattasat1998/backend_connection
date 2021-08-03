//local database connection
const mongoose = require("mongoose");
const config = require("../database/​​​​config");
mongoose
  .connect(config.database ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((suc) => console.log("Connected to db"))
  .catch((err) => console.log("Error occurred while connecting to db", err));
