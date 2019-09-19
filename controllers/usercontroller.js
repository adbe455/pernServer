let express = require('express');
let router = require('express').Router();
let sequelize = require('../db.js');
let User = sequelize.import('../models/user');
let bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');

router.post('/signup', function(req, res) {
    let pass = req.body.user.password;
    let firstname = req.body.user.firstname;
    let lastname = req.body.user.lastname;
    let email = req.body.user.email;

    User.create({
        firstname: firstname,
        lastname: lastname,
        email: email,
        passwordhash: bcrypt.hashSync(pass, 10)
    }).then(
        function createSuccess(user){
            let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24});

            res.json({
                    user: user,
                    message: 'created',
                    sessionToken: token
            });
        },
        function createError(err){
            res.send(500, err.message);
        }
    );
});

router.post('/login', function(req, res) {
    User.findOne( { where: { email: req.body.user.email } } ).then(
        function(user) {
            if (user) {
                bcrypt.compare(req.body.user.password, user.passwordhash, function(err, matches){
                    if (matches) {
                        let token = jwt.sign({id: user.id}, process.env.JWT_SECRET, {expiresIn: 60*60*24 });
                        res.json({
                            user: user,
                            message: "Login authenticated successfully.",
                            sessionToken: token
                        });
                    }else {
                        res.status(502).send({ error: "502 error" });
                    }
                });
            } else {
                res.status(500).send({ error: "Login failed to authenticate." });
            }
        },
        function(err) {
            res.status(501).send({ error: "501 error" });
        }
    );
});

module.exports = router;