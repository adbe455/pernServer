let router = require('express').Router();
let sequelize = require('../db');
let User = sequelize.import('../models/user');
let ReviewModel = sequelize.import('../models/review');

// GET ALL ITEMS
router.get('/', function (req, res) {
    let userid = req.user.id;

    ReviewModel
        .findAll({
            where: { owner: userid }
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

// POST ONE ITEM
router.post('/', function (req, res) {
    let ownerid = req.user.id;
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

// GET ITEM
router.get('/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    ReviewModel
        .findOne({
            where: { id: data, owner: userid }
        }).then(
            function findOneSuccess(data) {
                res.json(data);
            },
            function findOneError(err) {
                res.send(500, err.message);
            }
        );
});

// DELETE ITEM
router.delete('/:id', function(req, res) {
    let data = req.params.id;
    let userid = req.user.id;

    ReviewModel
        .destroy({
            where: { id: data, owner: userid }
        }).then(
            function deleteLogSuccess(data){
                res.send("you removed a log");
            },
            function deleteLogError(err){
                res.send(500, err.message);
            }
        );
});

// UPDATE ITEM
router.put('/:id', function(req, res) {
    let data = req.params.id;

    let score = req.body.review.score;
    let title = req.body.review.title;
    let body = req.body.review.body;

    ReviewModel
        .update(
        {
            score: score,
            title: title,
            body: body
        },
        {where: {id: data}}
        ).then(
            function updateSuccess(updatedLog) {
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