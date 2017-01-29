
// 1. Check for credentials
// 2. If no credentials, show link to page with instructions for adding banks
// 3. Once banks are added, rerun
var env = require('dotenv').config();

var jsonfile = require('jsonfile');
var request = require('request');
var plaid = require('plaid');
var fileName = "credentials.json";

jsonfile.readFile(fileName, (err, obj) => {
  if (err) {
    console.error("Error reading 'credentials.json'.");
    sys.exit();
  }
  
  request
    .post('https://tartan.plaid.com/income/get', {
      body : {
        client_id     : process.env.PLAID_CLIENT_ID,
        secret        : process.env.PLAID_SECRET,
        access_token  : obj.access_token
      },
      json: true
    },
    (err, resp, body) => {
      if (err) {
        console.error(err);
        sys.exit();
      }
      
      console.log(body);
      
      var income = body.income;
      var aggregated_income = income.income_streams.reduce(
        (prev, curr) => prev + curr.monthly_income, 0);
      
      console.log("estimated monthly income:", aggregated_income);
      console.log("projected yearly income:", income.projected_yearly_income);
    })
})
