const router = require('express').Router();
const Post = require('../models/Post');
const { check, validationResult } = require('express-validator');
// const { checkAdmin } = require('../middlewares');

router.get('/', (req, res) => {
    Post.find()
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            res.json(error);
        });
});

router.post('/new', [
    check('title', 'El campo title es obligatorio').not(),
    check('text', 'El campo text es obligatorio').exists(),
    check('category', 'El campo categoria es obligatorio').exists()
], async (req, res) => {
    // Comprobamos los errores del BODY
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ error: errors.array() });
    }

    try {
        const newPost = await Post.create(req.body);
        res.json(newPost);
    } catch (error) {
        res.json(error);
    }
});

router.put('/update/:idPost', async (req, res) => {
    try {
        const postEditado = await Post.findByIdAndUpdate(req.params.idPost, req.body, { new: true });
        res.json(postEditado);
    } catch (error) {
        res.json({ error: error.message });
    }
});

router.delete('/delete/:idPost', (req, res) => {
    Post.findByIdAndRemove(req.params.idPost)
        .then(postBorrado => {
            res.json(postBorrado);
        }).catch(error => {
            res.json({ error: error.message });
        });
});

// /* GET single post. */
router.get('/:idPost', function(req, res, next) {
    Post.findById(req.params.idPost)
        .then(post => {
            res.json(post);
        })
        .catch(error => {
            res.json({ error: error.message });
        });
});

module.exports = router;