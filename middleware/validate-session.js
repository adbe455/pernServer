const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');
const validateSession = (req, res, next) => {
   // console.log(req);
   const token = req.headers.authorization;
   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
       if(!err && decoded){
           User.findOne({
           where: {
               id: decoded.id
           }
       }, console.log(decoded))
       .then(user => {
           if(!user) throw 'err'
           req.user = user
           return next();
       })
       .catch(err => next(err))
       } else {
           req.error = err
           return res.status(500).send('Not Authorized')
       }
   })
}
module.exports = validateSession;