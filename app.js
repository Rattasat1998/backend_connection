//we will be using express.js for creating our service
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const userRouter = require("./router/user_router");
const passport = require('passport');
const core = require('cors');
const dashboard = require('./router/index')
// image 
const model = require('./model/image_model');
const mulImageSchema = require('./model/image_multiple');
// upload image
var multer  = require('multer');
const path= require('path');

//define data type
app.use(express.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(passport.initialize());
require('./database/passport')(passport);
require("./database/mongoose_db");

const errorMiddleWare = require("./middleware/error_midleware");

app.use('/api/user', userRouter);

if(process.env.NODE_ENV === 'development'){
  app.use(morgan('dev'));
}

app.use(errorMiddleWare);
// Dashboard Page
app.use(dashboard);
// IMAGE for User
app.use('/uploads', express.static(__dirname +'/uploads'));
var storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'uploads')
   },
   filename: function (req, file, cb) {
     cb(null, new Date().toISOString()+file.originalname)
   }
 })
  
 var upload = multer({ storage: storage })
 app.post('/upload', upload.single('myFile'), async(req, res, next) => {
   const file = req.file
   if (!file) {
     const error = new Error('Please upload a file')
     error.httpStatusCode = 400
     return next("hey error")
   }
     const imagepost= new model({
       image: file.path
     })
     const savedimage= await imagepost.save()
     res.json(imagepost.image);
     //res.json(savedimage)
     //res.json(imagepost)
   
 })
// IMAGE for Product
 app.post('/uploadmulti', upload.array('myFile', 4) , async(req, res) =>{
  try {
      res.send(req.files);
      const imagepost= new mulImageSchema({
        image1: file.path,
        image2: file.path,
        image3: file.path,
        image4: file.path,
      })
      const savedimage = await imagepost.save()
      res.json(imagepost.image1,imagepost.image2,imagepost.image3,imagepost.image4);
  } catch(error) {
        console.log(error);
         res.send(400);
  }
});

//set available port to connect our server
const PORT = process.env.PORT || 3000;
app.listen(PORT, (err, suc) => {
  if (err) throw err;
  console.log(`Server running on P ort ${PORT}`);
});
