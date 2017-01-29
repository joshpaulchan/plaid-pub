var router = require('express').Router();

var jsonfile = require('jsonfile');
var requests = require('requests');
var fileName = 'credentials.json'

module.exports = function(plaidClient, dataFile) {
    
  /* GET home page. */
  router.get('/link', (req, res) => {
    res.render('index', { "plaid_key" : process.env.PLAID_PUBLIC });
  });

  // GET `/authenticate`
  // Bounce the plaid public token back to plaid and save the access token
  // 
  // 
  router.post('/authenticate', (req, res) => {
    // save the public token
    var tok = req.body.public_token;
    
    // obtain access token
    plaidClient.exchangeToken(tok, (err, resp) => {
      if (err) {
        // Handle error
        console.error("[/authenticate] exchangeToken error");
      } else {
        var data = { access_token : resp.access_token };
        console.log("token", data);
        
        // save token
        jsonfile.writeFile(fileName, data, { spaces : 4 }, console.error);
        res.redirect('/');
      }
      
    })
    
  });
  
  // GET '/webhook/income-calculated'
  // Upon notification of income data calculations, make query for income data
  // 
  router.get('/webhook/income-calculated', (req, res) => {
    
  });
  
  return router;  
};
