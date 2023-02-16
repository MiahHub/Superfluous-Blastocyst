const router = require('express').Router();
const session = require('express-session');
const authorize = require('../utils/authorize');
const { User, Blog, Comment } = require('../models');

//get all blogs:
router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll({ include: User });
    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    res.render('home', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blog/:id', async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          include: {
            model: User,
            attributes: ['id', 'username'],
          },
        },
        {
          model: User,
          attributes: ['id', 'username'],
        },
        {
          model: Blog,
          attributes: ['title', 'content'],
        },
      ],
    });

    const blog = blogData.get({ plain: true });
    res.render('blog', {
      ...blog,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
router.get('/blog', async (req, res) => {
  try {
    const blogData = await Blog.findAll({ include: User });
    const blogs = blogData.map((blogs) => blogs.get({ plain: true }));
    res.render('blog', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});
// user dashboard route:
router.get('/dashboard', authorize, async (req, res) => {
  try {
    //uer logged-in by ID:
    console.log(req.session.user_id);
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Blog }],
    });

    const user = userData.get({ plain: true });

    console.log(user);

    res.render('dashboard', {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// user sing-up route:
router.get('/signup', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});
//add user redirect if logged in
// If user is already logged in redirect:
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
