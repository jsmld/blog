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
      nextPage: hasNextPage ? nextPage : null,
      currentRoute: '/'
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


/**
 * GET /
 * Post :id
*/

router.get('/post/:id', async (req, res) => {
  try {
    const locals = {
      title: "SVER Blog",
      description: "A blog where I share my learnings"
    };

    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });
    res.render('post', { locals, data, currentRoute: `/post/${slug}` });
  } catch (error) {
    console.log(error);
  }

});

/**
 * GET /
 * Post searchTerm
*/

router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search",
      description: "A blog where I share my learnings"
    };

    let searchTerm = req.body.searchTerm;
    const searchNoSpeacialChar = searchTerm.replace(/[^a-zA-Z0-9 ]/g, "");

    const data = await Post.find({
      $or: [
        { title: {$regex: new RegExp(searchNoSpeacialChar, 'i') }},
        { body: {$regex: new RegExp(searchNoSpeacialChar, 'i') }}
      ]
    });

    res.render("search", {
      data,
      locals
    });
  } catch (error) {
    console.log(error);
  }

});



router.get('/about', (req, res) => {
  res.render('about', { currentRoute: '/about'});
});





// function insertPostData () {
//   Post.insertMany([
//     {
//       title: 'Building a blog 1',
//       body: 'This is the body text of the blog post'
//     },
//     {
//       title: 'Building a blog 2',
//       body: 'This is the body text of the blog post'
//     },
//     {
//       title: 'Building a blog 3',
//       body: 'This is the body text of the blog post'
//     },
//     {
//       title: 'Building a blog 4',
//       body: 'This is the body text of the blog post'
//     },
//     {
//       title: 'Building a blog 5',
//       body: 'This is the body text of the blog post'
//     }
//   ])
// };

// insertPostData();

module.exports = router;
