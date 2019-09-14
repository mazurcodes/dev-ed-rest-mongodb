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


//
router.patch('/:titleSearch', async (req, res, next) => {
  const titleSearch = req.params.titleSearch;
  const {title, body} = req.body;
  const regexSearch = RegExp(titleSearch, 'i')
  try {
    const postsUpdate = await Posts.updateOne({title: regexSearch}, {title, body})
    res.json(postsUpdate);
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:titleSearch', async (req, res, next) => {
  const titleSearch = req.params.titleSearch;
  const regexSearch = RegExp(titleSearch, 'i')
  try {
    const postsDelete = await Posts.deleteOne({title: regexSearch});
    console.log("działa");
    res.json(postsUpdate);
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
