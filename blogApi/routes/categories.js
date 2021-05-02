const router = require('express').Router();
const Post = require('../models/Post');

// GET /post/category
router.get('/:category', async (req, res) => {
    try {
        const postConCategoria = await Post.find( { category: req.params.idPost } ).exec();
        res.json(postConCategoria);
    } catch(error) {
        res.json({ error: error.message});
    }
});


// GET /post/category
router.get('/', async (req, res) => {
    try {
        const agregate = await Post.aggregate([{
            "$group": {  
                "_id": null,
                "category": { "$first": "$category"}
            }
        }]);
        //.$group( { category: "$category"}).exec();
        res.json(agregate);
    } catch(error) {
        res.json({ error: error.message});
    }
});

module.exports = router;