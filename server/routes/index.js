const express = require('express');
const router = express.Router();
const multer = require('multer');
const passport = require('passport');

const Post = require('../models/post');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images/');
    },
    filename(req, file, cb) {
        let dot = file.originalname.lastIndexOf('.');
        let name = file.originalname.substring(0, dot);
        let ext = file.originalname.substring(dot);
        cb(null, `${name}-${new Date().getTime()}${ext}`);
    },
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } });

router.post('/createpost', passport.authenticate('jwt', { session: false }), upload.single('image'),  async (req, res) => {
    const post =  await Post.create({
            userId: req.user._id,
            imagePath: req.file.path,
            title: req.body.title,
            description: req.body.description,
            date: new Date()
        });
        res.status(200).send(post);
    });



router.get('/posts', passport.authenticate('jwt', { session: false }), async (req, res) => {
    let posts = await Post.find({ userId: req.user._id });
    console.log(posts)
    res.status(200).send(posts);
});

router.delete('/deletepost/:id', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Post.findOneAndDelete({ _id: req.params.id });
    res.sendStatus(200);
});

router.get('/editpost', passport.authenticate('jwt', { session: false }), async (req, res) => {
    await Post.findOneAndUpdate({ _id: req.params.id });
    res.sendStatus(200);
});

module.exports = router;