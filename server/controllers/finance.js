import plaid from "plaid";
import envvar from "envvar";
import moment from "moment";
import stripePackage from "stripe";
import { stripeKeys } from "../config";
import { calculateSavedChange, filterTransactions, splitTransactions } from "../helpers/utils";
import User from "../models/user";

const PLAID_CLIENT_ID = envvar.string("PLAID_CLIENT_ID");
const PLAID_SECRET = envvar.string("PLAID_SECRET");
const PLAID_PUBLIC_KEY = envvar.string("PLAID_PUBLIC_KEY");
const PLAID_ENV = "development";

const client = new plaid.Client(PLAID_CLIENT_ID, PLAID_SECRET, PLAID_PUBLIC_KEY, plaid.environments[PLAID_ENV]);

export const getAccessToken = (req, res, next) => {
  const { user, public_token } = req.body;

  client.exchangePublicToken(public_token, (error, tokenResponse) => {
    const { access_token, item_id } = tokenResponse;
    const lastContribDate = access_token && user.hasCustomerId ? moment().format("YYYY-MM-DD") : null;
    const startedTrackingDate = access_token && user.hasCustomerId ? moment().format("YYYY-MM-DD") : null;

    const changeset = {
      access_token,
      hasAccessToken: true,
      startedTrackingDate,
      lastContribDate
    };

    if (error != null) {
      return res.json({ error });
    }

    User.findOneAndUpdate({ email: user.email }, changeset, { new: true }, (err, user) => {
      if (err) {
        return next(err);
      }
      res.json(user);
    });
  });
};

export const getPublicToken = (req, res, next) => {
  const user = JSON.parse(req.query.user);

  User.findOne({ email: user.email }, (error, u) => {
    const accessToken = u.access_token;

    client.createPublicToken(accessToken, (err, result) => {
      if (err) {
        return next(err);
      }
      res.json({ public_token: result.public_token });
    });
  });
};

export const getTransactions = (req, res, next) => {
  const email = req.query.email;

  User.findOne({ email }, (error, u) => {
    const today = moment().format("YYYY-MM-DD");
    const threeWeeksAgo = moment()
      .subtract(3, "weeks")
      .format("YYYY-MM-DD");
    const accessToken = u.access_token;
    let startDate;

    if (moment(threeWeeksAgo, "YYYY-MM-DD").isBefore(u.startedTrackingDate)) {
      startDate = u.startedTrackingDate;
    } else {
      startDate = threeWeeksAgo;
    }

    client.getTransactions(accessToken, startDate, today, { count: 250, offset: 0 }, (err, result) => {
      if (err != null) {
        return res.status(400).send({ error: err });
      }

      let transactions = filterTransactions(result.transactions);
      let transObj = splitTransactions(transactions, u.lastContribDate);
      const savedChange = calculateSavedChange(transObj.active);
      res.json({ transactions: transObj, savedChange });
    });
  });
};

export const chargeUsers = () => {
  const stripeKey = process.env.NODE_ENV === "production" ? stripeKeys.live : stripeKeys.test;
  const stripe = stripePackage(stripeKey);
  const today = moment()
    .subtract(1, "days")
    .format("YYYY-MM-DD");

  User.find({}, (err, users) => {
    users.map(u => {
      if (u.customerId && u.access_token) {
        client.getTransactions(u.access_token, u.lastContribDate, today, { count: 250, offset: 0 }, (err, result) => {
          if (err == null) {
            const transactions = filterTransactions(result.transactions);
            let savedChange = calculateSavedChange(transactions);
            savedChange = 100 * savedChange.toFixed(2);

            if (savedChange >= 50) {
              if (savedChange > u.maxWeeklyContribution && u.maxWeeklyContribution !== -1) {
                savedChange = u.maxWeeklyContribution;
              }

              stripe.charges.create({
                amount: savedChange,
                currency: "usd",
                customer: u.customerId
              });

              const total = u.total + savedChange / 100;
              const numContribs = u.numContribs + transactions.length;
              const lastContribDate = moment().format("YYYY-MM-DD");
              User.findOneAndUpdate({ email: u.email }, { total, numContribs, lastContribDate }, (err, result) => {
                if (err != null) {
                  console.log("There was an error:", err);
                }
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
};
