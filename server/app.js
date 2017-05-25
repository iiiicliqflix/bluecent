const express = require('express');
const bodyParser = require('body-parser');
const envvar = require('envvar');
const cors = require('cors');
const plaid = require('plaid');
const app = express();

app.use(cors());
app.use(bodyParser.json());

let PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
let PLAID_SECRET = envvar.string('PLAID_SECRET');
let PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
let PLAID_ENV = 'sandbox';

let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;

let client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

app.post('/get_access_token', function(req, res, next) {
  PUBLIC_TOKEN = req.body.public_token;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log(`Could not exchange public_token: ${error}.`);
      return res.json({error: msg});
    }
    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;
    console.log(`Access Token: ${ACCESS_TOKEN}`);
    console.log(`Item ID: ${ITEM_ID}`);
    res.json({'error': false});
  });
});

app.get('/auth', function(req, res, next) {
  client.getAuth(ACCESS_TOKEN, function(error, numbersData) {
    if (error != null) {
      console.log(`Unable to pull accounts from Plaid API: ${error}.`);
      return res.json({error: msg});
    }
    res.json({
      error: false,
      accounts: numbersData.accounts,
      numbers: numbersData.numbers
    });
  });
});

app.listen(8000);
