const mongoose = require("mongoose");
const Joi = require("@hapi/joi");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;

//define User model restrictions
const UserSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    // photo: {
    //   type: String,
    //   trim: true,
    // },
    // age: {
    //     type: String,
    //     trim: true,
    //   },
    // email: {
    //     type: String,
    //     trim: true,
    // },
    // address: {
    //     type: String,
    //     trim: true,
    // },
    password: {
        type: String,
        trim: true,
    },
    // follow: {
    //     type: String,
    //     trim: true,
    // },
    // like: {
    //     type: String,
    //     trim: true,
    // },
    // rate: {
    //     type: String,
    //     trim: true,
    // },
    // status: {
    //     type: String,
    //     trim: true,
    // },
    // createdDate: {
    //   type: Date,
    //   default: Date.now,
    // },
  },
  { collection: "user" }
);

const schema = Joi.object({
  name: Joi.string().trim(),
  // photo: Joi.string().trim(),
  // age: Joi.string().trim(),
  // email: Joi.string().trim(),
  // address: Joi.string().trim(),
  password: Joi.string().trim(),
  // follow: Joi.string().trim(),
  // like: Joi.string().trim(),
  // rate: Joi.string().trim(),
  // status: Joi.string().trim(),
  // createdDate: Joi.date()
});

UserSchema.pre('save',function(next) {
  var user = this;
  if(this.isModified('password') || this.isNew){
    bcrypt.genSalt(10,function(err,salt){
      if(err){
        return next(err)
      }
      bcrypt.hash(user.password,salt, function(err, hash){
        if(err){
          return next(err)
        }
        user.password = hash;
        next();
      })
    })
  }
  else{
    return next()
  }
});
UserSchema.methods.comparePassword = function(passw,cb){
  bcrypt.compare(passw, this.password, function(err,isMatch){
    if(err){
      return cb(err)
    }
    cb(null,isMatch)
  })
}

UserSchema.methods.joiValidation = function (userbject) {
  schema.required();
  return schema.validate(userbject);
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
