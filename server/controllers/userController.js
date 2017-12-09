import User from "../models/user";
import stripePackage from "stripe";
import moment from "moment";
import { tokenForUser } from "../helpers/token";
import { sendVerificationEmail } from "../helpers/email";
import { stripeKeys } from "../config";

export const login = (req, res, next) => {
  const {
    first,
    last,
    email,
    hasAccessToken,
    hasCustomerId,
    total,
    numContribs,
    lastContribDate,
    maxWeeklyContribution
  } = req.user;

  res.json({
    token: tokenForUser(req.user),
    first,
    last,
    email,
    hasAccessToken,
    hasCustomerId,
    total,
    numContribs,
    lastContribDate,
    maxWeeklyContribution
  });
};

export const signup = (req, res, next) => {
  const { first, last, email, password } = req.body;

  if (!first || !last || !email || !password) {
    return res.status(422).send({ error: "All fields are required." });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) {
      return next(err);
    }

    if (existingUser) {
      return res.status(422).send({ error: "Email already in use." });
    }

    const user = new User({ first, last, email, password });

    user.save(err => {
      if (err) {
        return next(err);
      }

      sendVerificationEmail(email, first, user.auth.token);
      res.json({ first, last, email });
    });
  });
};

export const verifyAccount = (req, res, next) => {
  const { email, token } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) {
      return next(err);
    }

    if (!user) {
      return res
        .status(422)
        .send({ error: { message: "User does not exist." } });
    }

    if (user.auth.used) {
      return res
        .status(422)
        .send({ error: { message: "Link already used", resend: false } });
    }

    if (new Date() > user.auth.expires) {
      return res
        .status(422)
        .send({ error: { message: "Link already expired.", resend: true } });
    }

    if (token !== user.auth.token) {
      return res.status(422).send({
        error: {
          message: "Something has gone wrong, please sign up again.",
          resend: false
        }
      });
    }

    User.findByIdAndUpdate(
      user.id,
      { role: 1, auth: { used: true } },
      { new: true },
      (err, user) => {
        if (err) {
          return next(err);
        }

        const {
          first,
          last,
          email,
          hasAccessToken,
          hasCustomerId,
          total,
          numContribs,
          lastContribDate,
          maxWeeklyContribution
        } = user;

        res.json({
          token: tokenForUser(user),
          first,
          last,
          email,
          hasAccessToken,
          hasCustomerId,
          total,
          numContribs,
          lastContribDate,
          maxWeeklyContribution
        });
      }
    );
  });
};

export const deleteAccount = (req, res, next) => {
  console.log(req.body.user);
};

export const setupPayments = (req, res, next) => {
  let stripeKey =
    process.env.NODE_ENV === "production" ? stripeKeys.live : stripeKeys.test;
  let stripe = stripePackage(stripeKey);
  let user = req.body.user;
  let token = req.body.token;

  stripe.customers
    .create({ email: user.email })
    .then(customer => {
      let lastContribDate = null;
      let startedTrackingDate = null;

      if (customer.id && user.hasAccessToken) {
        startedTrackingDate = moment().format("YYYY-MM-DD");
        lastContribDate = moment().format("YYYY-MM-DD");
      }

      const changeset = {
        customerId: customer.id,
        hasCustomerId: true,
        startedTrackingDate,
        lastContribDate
      };

      User.findOneAndUpdate({ email: user.email }, changeset, err => {
        if (err) {
          return next(err);
        }
        res.json({ hasCustomerId: true });
      });

      return stripe.customers.createSource(customer.id, { source: token.id });
    })
    .catch(err => {
      console.log("Error setting up payment: ", err);
    });
};

export const saveSettings = (req, res, next) => {
  const { user, maxContribution } = req.body;
  const changeset = { maxWeeklyContribution: maxContribution };

  User.findByIdAndUpdate(user.id, changeset, { new: true }, (err, user) => {
    if (err) {
      return next(err);
    }
    res.json({ user });
  });
};
