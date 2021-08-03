//we will be using express.js for creating our service
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require("./router/user_router");
const passport = require('passport');
const core = require('cors');
//define data type
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./database/passport')(passport);
require("./database/mongoose_db");

const errorMiddleWare = require("./middleware/error_midleware");

app.use('/api/user', userRouter);

app.use(errorMiddleWare);


app.get('/',(req,res) => {
  res.send('Database')
})
//set available port to connect our server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, suc) => {
  if (err) throw err;
  console.log(`Server running on ${PORT} port`);
});
