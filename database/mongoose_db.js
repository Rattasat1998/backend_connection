//local database connection
const mongoose = require("mongoose");
const dbConnection = "mongodb+srv://activatex:123@cluster0.oqu5s.mongodb.net/Connection?retryWrites=true&w=majority";

mongoose
  .connect(dbConnection ,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then((suc) => console.log("Connected to db"))
  .catch((err) => console.log("Error occurred while connecting to db", err));
