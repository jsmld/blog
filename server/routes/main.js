const express = require('express');
const router = express.Router();

// Routes
router.get('/', (req, res) => {
  const locals = {
    title: "SVER Blog",
    description: "A blog where I share my learnings"
  };

  res.render('index', { locals });
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;
