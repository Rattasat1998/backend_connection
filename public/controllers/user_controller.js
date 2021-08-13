var User = require("../model/user_model");
var bcrypt = require("bcrypt");
var jwt = require("jwt-simple");
var config = require("../database/​​​​config")
var createError = require("http-errors");

//add new user
const addNewUser = async (req, res, next) => { 
  const newUser = new User(req.body);

  const { error, value } = newUser.joiValidation(req.body);

  if (error) {
    return res.status(400).json({
      result: false,
      message: error,
    });
  } else {
    try {
      const result = await newUser.save();
      if (result) {
        return res.status(201).json({
          result: true,
          message: "บันทึกข้อมูลแล้ว",
        });
      } else {
        return res.status(400).json({
          result: false,
          message: "บันทึกข้อมูลล้มเหลว",
        });
      }
    } catch (error) {
      next(createError(error));
    }
  }
};

//update user
const updateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.id, {}, { lean: true });
    if (user) {
      const willBeUpdated = await User.findByIdAndUpdate(
        { _id: req.body.id },
        req.body,
        { lean: true, new: true }
      );
      if (willBeUpdated) {
        return res.status(201).json({
          result: true,
          message: "อัปเดตเรียบร้อย"
        });
      } else {
        return res.status(400).json({
          result: true,
          message: "อัปเดตล้มเหลว",
        });
      }
    } else {
      return res.status(404).json({
        result: false,
        message: "เกิดข้อผิดพลาด",
      });
    }
  } catch (error) {
    next(createError(error));
  }
};

//delete account
const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.body.id });
    if (user) {
      return res.status(201).json({
        result: true,
        message: "ลบ account สำเร็จ",
      });
    } else {
      return res.status(400).json({
        result: false,
        message: "ลบ account ล้มเหลว",
      });
    }
  } catch (error) {
    next(createError(error));
  }
};

//get all data
const getAllUsers = async (req, res, next) => {
  try {
    const allData = await User.find({}, {}, { lean: true });
    return res.status(200).json(allData);
  } catch (error) {
    next(createError(error));
  }
};

const authentication = async (req, res) => {
  User.findOne({
    name: req.body.name
  },function(err, user){
    if(err) throw err
    if(!user){
      res.status(403).send({success: false, msg: 'Authentication Failed ไม่พบ User'})
    }
    else{
      user.comparePassword(req.body.password, function(err,isMatch){
        if(isMatch && !err){
          var token = jwt.encode(user,config.secret);
          res.json({success:true,token: token});
        }
        else{
          return res.status(403).send({success:false,msg:'Authentication Failed wrong Password'})
        }
      })
    }
  })
}

const getprofile = async (req, res) => {
  if(req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
  {
    var token = req.headers.authorization.split(' ')[1]
    var decodedtoken = jwt.decode(token,config.secret)
    return res.json({success: true, msg: 'Hello Welcome Mrs. ' + decodedtoken.name})
  }
  else{
    return res.json({success:false,msg:'No Header'})
  }
  
}

module.exports = {
  addNewUser,
  updateUser,
  deleteUser,
  getAllUsers,
  authentication,
  getprofile
};
