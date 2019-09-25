let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let ReviewModel = sequelize.import('../models/review');

// GET ALL REVIEWS BY GAMEID
router.get('/all/:gameid', function (req, res) {
    // let userid = req.user.id;
    let gameid = req.params.gameid

    ReviewModel
        .findAll({
            where: { gameid: gameid  }
        })
        .then(
            function findAllSuccess(data) {
                res.json(data);
            },
            function findAllError(err) {
                res.send(500, err.message);
            }
        );
});

// POST A REVIEW
router.post('/', function (req, res) {
    let ownerid = req.user.id;
    let firstname = req.user.firstname;
    let lastname = req.user.lastname;
    let review = req.body.review;
    let gameid = req.body.review.gameid;
    let score = req.body.review.score;
    let title = req.body.review.title;
    let body = req.body.review.body;


    ReviewModel
        .create({
            review: review,
            ownerid: ownerid,
            gameid: gameid,
            firstname: firstname,
            lastname: lastname,
            score: score,
            title: title,
            body: body
        })
        .then(
            function createSuccess(review) {
                res.json({
                    review: review
                });
            },
            function createError(err) {
                res.send(500, err.message);
            }
        );
});

// GET A REVIEW BY REVIEWID
router.get('/:gameid', function(req, res) {
    let gameid = req.params.gameid;
    let userid = req.user.id;

    ReviewModel
        .findOne({
            where: { gameid: gameid, ownerid: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

// DELETE A REVIEW
router.delete('/:gameid', function(req, res) {
    let gameid = req.params.gameid;
    let userid = req.user.id;

    ReviewModel
        .destroy({
            where: { gameid: gameid, ownerid: userid }
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});

// UPDATE A REVIEW
router.put('/', function(req, res) {
    let userid = req.user.id;
    let review = req.body.review;
    let gameid = req.body.review.gameid;
    let score = req.body.review.score;
    let title = req.body.review.title;
    let body = req.body.review.body;

    ReviewModel
        .update({
            review: review,
            score: score,
            title: title,
            body: body
        },
            {where: {gameid: gameid, ownerid: userid}}
        ).then(
            function updateSuccess(updatedReview) {
                res.json({
                    review: review
                });            
            },
            function updateError(err){
                res.send(500, err.message);
            }
        )
});

module.exports = router;