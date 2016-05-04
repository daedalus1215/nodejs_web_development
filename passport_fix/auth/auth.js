var passport = require('passport'),
    Account = require('../model/account'),
    express = require('express'),
    router  = express.Router();


router.route('/register')
  .get(function(req, res, next) {
    res.render('register', { });
  })
  .post(function(req, res, next) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, rAccount) {
      if (err) {
        return res.render('register', {account : rAccount});
      }
      req.login(account, function(err) {
        res.redirect('/contacts');
      });
    });
  });

router.get('/login', function(req, res, next) {
  res.render('login', {user : req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
  res.redirect('/contacts');
});

router.all('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

module.exports = router;