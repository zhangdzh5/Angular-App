const express = require('express');

const router = express.Router();
const Post = require('../models/post');

// new
router.post('/', (req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  post.save().then(createdPost => {
    res.status(201).json({
      message: 'Post added successfully!',
      postId: createdPost._id
    });
  });
});

// edit
router.get("/:id", (req, res, next) => {
  Post.findById(req.params.id).then(post => {
    if(post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Post not found!" });
    }
  })
});


router.put("/:id", (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content
  });
  Post.updateOne({ _id: req.params.id }, post).then(result => {
    console.log(result);
    res.status(200).json({ message: "Update successful!" });
  });
});

// index
router.get('/',(req, res, next) => {
  Post.find().then(docs => {
    res.status(200).json({
      message: 'Posts fetched successfully',
      posts: docs
    });
  });
});

// delete
router.delete('/:id', (req, res, next) => {
  Post.findByIdAndDelete(req.params.id).then(result => {
    console.log("Post deleted!");
    res.status(200).json({ message: "Post deleted!" });
  });
});

module.exports = router;
