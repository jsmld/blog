const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('/', async (req, res) => {
  const locals = {
    title: "SVER Blog",
    description: "A blog where I share my learnings"
  };

  try {
    const data = await Post.find();
    res.render('index', { locals, data });
  } catch (error) {
    console.log(error);
  }

});



router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
