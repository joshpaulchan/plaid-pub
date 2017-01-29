var router = require('express').Router();

/* GET home page. */
router.get('/', (req, res) => {
  res.render('index', { "plaid_key" : process.env.PLAID_PUBLIC });
});

module.exports = router;
