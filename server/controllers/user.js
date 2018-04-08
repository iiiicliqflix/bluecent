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
    points,
    numContribs,
    lastContribDate,
    maxWeeklyContribution
  } = req.user;

  res.json({ token: tokenForUser(req.user), ...user });
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
      return res.json({ first, last, email });
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
      return res.status(422).send({ error: { message: "User does not exist." } });
    }

    if (user.auth.used) {
      return res.status(422).send({ error: { message: "Link already used", resend: false } });
    }

    if (new Date() > user.auth.expires) {
      return res.status(422).send({ error: { message: "Link already expired.", resend: true } });
    }

    if (token !== user.auth.token) {
      return res.status(422).send({
        error: {
          message: "Something has gone wrong, please sign up again.",
          resend: false
        }
      });
    }

    User.findByIdAndUpdate(user.id, { role: 1, auth: { used: true } }, { new: true }, (err, user) => {
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
        points,
        numContribs,
        lastContribDate,
        maxWeeklyContribution
      } = user;

      return res.json({ token: tokenForUser(user), ...user });
    });
  });
};

export const deleteAccount = (req, res, next) => {
  const { user } = req.body;

  User.findOneAndRemove({ email: user.email }, err => {
    if (err) {
      return next(err);
    }

    return res.json({ userDeleted: true });
  });
};

export const setupPayments = (req, res, next) => {
  const { user, token } = req.body;
  const stripeKey = process.env.NODE_ENV === "production" ? stripeKeys.live : stripeKeys.test;
  const stripe = stripePackage(stripeKey);

  stripe.customers
    .create({ email: user.email })
    .then(customer => {
      const lastContribDate = customer.id && user.hasAccessToken ? moment().format("YYYY-MM-DD") : null;
      const startedTrackingDate = customer.id && user.hasAccessToken ? moment().format("YYYY-MM-DD") : null;

      const changeset = {
        customerId: customer.id,
        hasCustomerId: true,
        startedTrackingDate,
        lastContribDate
      };

      User.findOneAndUpdate({ email: user.email }, changeset, { new: true }, (err, user) => {
        if (err) {
          return next(err);
        }

        stripe.customers
          .createSource(customer.id, { source: token.id })
          .then(() => res.json(user))
          .catch(err => next(err));
      });
    })
    .catch(err => next(err));
};

export const saveSettings = (req, res, next) => {
  const { user: { token, email }, maxContribution } = req.body;
  const changeset = { maxWeeklyContribution: maxContribution };

  User.findOneAndUpdate({ email }, changeset, { new: true }, (err, user) => {
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
      points,
      numContribs,
      lastContribDate,
      maxWeeklyContribution
    } = user;

    return res.json({ token, ...user });
  });
};

export const updatePayments = (req, res, next) => {
  const { user, token } = req.body;
  const stripeKey = process.env.NODE_ENV === "production" ? stripeKeys.live : stripeKeys.test;
  const stripe = stripePackage(stripeKey);

  User.findOne({ email: user.email }, (err, user) => {
    if (err) {
      return next(err);
    }

    stripe.customers
      .update(user.customerId, { source: token.id })
      .then(response => {
        return res.json({ updateStripeSuccess: true });
      })
      .catch(err => {
        return next(err);
      });
  });
};
