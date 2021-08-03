var JwtStrategy = require('passport-jwt').Strategy
var ExtractJwt = require('passport-jwt').ExtractJwt

var User = require('../model/user_model')
var keys = require('../database/​​​​config')

module.exports = function(passport){
    const opts = {}

    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt')
    opts.secretOrKey = keys.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done){
        User.find({
            id:jwt_payload.id
        },function(err, user){
            if(err){
                return done(err,false)
            }
            if(user){
                return done(null, user)
            }
            else{
                return done(null , false)
            }
        })
    }))
}