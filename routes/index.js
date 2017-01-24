var router = require('express').Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// GET `/autenticate`
// Bounce the plaid public token back to plaid and save the access token
// 
// 
router.get('/authenticate', (req, res) => {
  // save the public token
});

module.exports = router;
