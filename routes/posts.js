var express = require('express');
var router = express.Router();
const Posts = require('../models/Posts');

/* GET home page. */
router.get('/', async (req, res, next) => {
  try {
    const posts = await Posts.find()
    res.json(posts);
  } catch (error) {
    res.json(error);
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const post = new Posts(body);
  console.log(body);
  try {
    await post.save();
    res.redirect('/posts');
  } catch (error) {
    res.json({ error });
  }
});



module.exports = router;
