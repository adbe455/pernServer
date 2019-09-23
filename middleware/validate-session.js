var jwt = require('jsonwebtoken');
var sequelize = require('../db');
var User = sequelize.import('../models/user');

module.exports = function(req, res, next) {
     if (req.method == 'OPTIONS') {
         next()
     } else {
        var sessionToken = req.headers.authorization;
        console.log(sessionToken)
        if (!sessionToken) return res.status(403).send({ auth: false, message: 'No token provided.' });
        else {
            jwt.verify(sessionToken, process.env.JWT_SECRET, (err, decoded) => {
                if(decoded){
                    User.findOne({where: { id: decoded.id}}).then(user => {
                        req.user = user;
                        next();
                    },
                    function(){
                        res.status(401).send({error: 'Not authorized'});
                    });
                } else {
                    res.status(400).send({error: 'Not authorized'});
                }
            });
        }
    }
}



// const jwt = require('jsonwebtoken');
// const User = require('../db').import('../models/user');
// const validateSession = (req, res, next) => {
//    // console.log(req);
//    const token = req.headers.authorization;
//    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//        if(!err && decoded){
//            User.findOne({
//            where: {
//                id: decoded.id
//            }
//        }, console.log(decoded))
//        .then(user => {
//            if(!user) throw 'err'
//            req.user = user
//            return next();
//        })
//        .catch(err => next(err))
//        } else {
//            req.error = err
//            return res.status(500).send('Not Authorized')
//        }
//    })
// }
// module.exports = validateSession;