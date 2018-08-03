const express = require('express');
const router = express.Router();
const { Page, User } = require('../models');
const {
  addPage,
  editPage,
  index,
  layout,
  main,
  userList,
  userPages,
  wikipage,
} = require('../views');

router.get('/', async (req, res, next) => {
  try {
    const pages = await Page.findAll();
    res.send(main(pages));
  } catch (err) {
    next(err);
  }
});
router.post('/', async (req, res, next) => {
  const page = new Page(req.body);
  try {
    const [user, wasCreated] = await User.findOrCreate({
      where: {
        name: req.body.name,
        email: req.body.email,
      },
    });

    const page = await Page.create(req.body);
    page.setAuthor(user);
    res.redirect(`/wiki/${page.slug}`);
  } catch (err) {
    next(err);
  }
});
router.get('/add', async (req, res, next) => {
  res.send(addPage());
});
router.get('/:slug', async (req, res, next) => {
  try {
    const page = await Page.findOne({
      where: {
        slug: req.params.slug,
      },
    });
    if (page === null) {
      res.sendStatus(404);
    } else {
      const author = await page.getAuthor();
      res.send(wikipage(page, author));
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
