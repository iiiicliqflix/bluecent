import plaid from 'plaid';
import envvar from 'envvar';
import moment from 'moment';
import stripePackage from 'stripe';
import { stripeKeys } from '../config';
import User from '../models/user';

const PLAID_CLIENT_ID = envvar.string('PLAID_CLIENT_ID');
const PLAID_SECRET = envvar.string('PLAID_SECRET');
const PLAID_PUBLIC_KEY = envvar.string('PLAID_PUBLIC_KEY');
const PLAID_ENV = 'development';

let ACCESS_TOKEN = null;
let PUBLIC_TOKEN = null;
let ITEM_ID = null;

let client = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments[PLAID_ENV]
);

export const getAccessToken = (req, res, next) => {
  PUBLIC_TOKEN = req.body.public_token;
  let u = req.body.user;
  client.exchangePublicToken(PUBLIC_TOKEN, function(error, tokenResponse) {
    if (error != null) {
      console.log(`Could not exchange public_token: ${error}.`);
      return res.json({error: error});
    }

    ACCESS_TOKEN = tokenResponse.access_token;
    ITEM_ID = tokenResponse.item_id;

    User.findOneAndUpdate({ email: u.email }, { access_token: ACCESS_TOKEN, hasAccessToken: true }, (err) => {
      if (err) { return next(err); }
      res.json({ hasAccessToken: true });
    });
  });
}

export const getTransactions = (req, res, next) => {
  const user = JSON.parse(req.query.user);
  const today = moment().format('YYYY-MM-DD');
  const threeWeeksAgo = moment().subtract(3, 'weeks').format('YYYY-MM-DD');

  User.findOne({ email: user.email }, (error, u) => {
    const accessToken = u.access_token;

    client.getTransactions(accessToken, threeWeeksAgo, today, { count: 250, offset: 0 }, (err, result) => {
      if (err != null) {
        console.log(err);
        console.log('Error in fetching transactions.');
        return res.json({ error: err });
      }

      let transactions = filterTransactions(result.transactions);
      let transObj = splitTransactions(transactions, u.lastContribDate);
      const savedChange = calculateSavedChange(transObj.active);
      res.json({ transactions: transObj, savedChange });
    });
  });
}

export const chargeUsers = () => {
  let stripeKey = ((process.env.NODE_ENV === 'production') ? stripeKeys.live : stripeKeys.test);
  let stripe = stripePackage(stripeKey);
  let today = moment().format('YYYY-MM-DD');

  User.find({}, (err, users) => {
    users.map((u) => {
      if (u.customerId && u.access_token) {
        client.getTransactions(u.access_token, u.lastContribDate, today, { count: 250, offset: 0 }, (err, result) => {
          if (err == null) {
            let transactions = filterTransactions(result.transactions);
            let savedChange = calculateSavedChange(transactions);
            savedChange = 100 * savedChange.toFixed(2);

            if (savedChange >= 50) {
              stripe.charges.create({
                amount: savedChange,
                currency: "usd",
                customer: u.customerId
              });

              const total = u.total + (savedChange/100);
              const numContribs = u.numContribs + transactions.length;
              const lastContribDate = today;
              User.findOneAndUpdate({ email: u.email }, { total, numContribs, lastContribDate }, (err, result) => {
                if (err != null) { console.log('There was an error:', err); }
                console.log("Successfully charged user.");
              });
            }
          } else {
            console.log(err);
          }
        });
      }
    });
  });
}

function calculateSavedChange(transactions) {
  return transactions.reduce((acc, item) => {
    if (item.amount > 0) {
      return acc + (Math.ceil(item.amount) - item.amount);
    }
    return acc;
  }, 0);
}

function filterTransactions(transactions) {
  return transactions.filter((item) => {
    if (item.amount > 0 && (Math.ceil(item.amount) - item.amount) !== 0) {
      return true
    }
    return false
  });
}

function splitTransactions(transactions, lastContribDate) {
  let active = [];
  let contributed = [];
  transactions.forEach((item) => {
    if (moment(item.date, 'YYYY-MM-DD').isBefore(lastContribDate)) {
      contributed.push(item);
    } else {
      active.push(item);
    }
  });
  return { active, contributed };
}
