const express = require('express');
const router = express.Router();

// const expressValidator = require('express-validator');
const { check, validationResult } = require('express-validator');

// Bring in Article Model
let Article = require('../models/article');
// Bring in User Model
let User = require('../models/user');


// Add Route
router.get('/add', ensureAuthenticated, (req, res) => {
  res.render('add_article', {
    title: 'Add Article'
  });
});

// Load Edit Form
router.get('/edit/:id', ensureAuthenticated, (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      req.flash('danger', 'Not Authorized');
      res.redirect('/');
    } else {
      res.render("edit_article", {
          title: "Edit Article",
          article: article
      });
    }
    
  });
});

// Add Submit POST Route
router.post('/add', [
  check('title').not().isEmpty().withMessage('Title is required'),
  // check('author').not().isEmpty().withMessage('Author is required'),
  check('body').not().isEmpty().withMessage('Body is required')
], (req, res) => {
  // req.checkBody('title', 'Title is required').notEmpty();
  // req.checkBody('author', 'Author is required').notEmpty();
  // req.checkBody('body', 'Body is required').notEmpty();

  // Get Errors
  // let errors = req.validationErrors();
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.render('add_article', {
      title: 'Add Article',
      errors: errors.array()
    });
  } else {
    let article = new Article();
    article.title = req.body.title;
    article.author = req.user._id;
    article.body = req.body.body;

    article.save((err) => {
      if (err) {
        console.log(err);
        return;
      } else {
        req.flash('success', 'Article Added');
        res.redirect('/');
      }
    });
  }

});

// Update Submit POST Route
router.post('/edit/:id', ensureAuthenticated, (req, res) => {
  let article = {};
  article.title = req.body.title;
  article.author = req.body.author;
  article.body = req.body.body;

  let query = {_id: req.params.id};

  Article.update(query, article, (err) => {
    if (err) {
      console.log(err);
      return;
    } else {
      req.flash('success', 'Article Updated');
      res.redirect('/');
    }
  });
});

router.delete('/:id', (req, res) => {
  if (!req.user._id) {
    res.status(500).send();
  }

  let query = {_id: req.params.id};

  Article.findById(req.params.id, (err, article) => {
    if (article.author != req.user._id) {
      res.status(500).send();
    } else {
      Article.remove(query, err => {
          if (err) {
              console.log(err);
          }
          res.send("Success");
      });
    }
  });
});

// Get Single Articles
router.get('/:id', (req, res) => {
  Article.findById(req.params.id, (err, article) => {
    User.findById(article.author, (err, user) => {
      res.render("article", {
          article: article,
          author: user.name
      });
    });
  });
});

// Access Control
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    req.flash('danger', 'Please login');
    res.redirect('/users/login');
  }
}

module.exports = router;
