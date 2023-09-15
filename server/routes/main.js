const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

/**
 * GET /
 * HOME
*/
router.get('/', async (req, res) => {
  try {
    const locals = {
      title: "SVER Blog",
      description: "A blog where I share my learnings"
    };

    let perPage = 5;
    let page = req.query.page || 1;

    const data = await Post.aggregate([{ $sort: { createdAt: -1 } }])
                           .skip(perPage * page - perPage)
                           .limit(perPage)
                           .exec();

    const count = await Post.count();
    const nextPage = parseInt(page) + 1;
    const hasNextPage = nextPage <= Math.ceil(count / perPage);

    res.render('index', {
      locals,
      data,
      current: page,
      nextPage: hasNextPage ? nextPage : null
    });
  } catch (error) {
    console.log(error);
  }

});



// WITHOUT PAGINATION

// router.get('/', async (req, res) => {
//   const locals = {
//     title: "SVER Blog",
//     description: "A blog where I share my learnings"
//   };

//   try {
//     const data = await Post.find();
//     res.render('index', { locals, data });
//   } catch (error) {
//     console.log(error);
//   }

// });



router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
