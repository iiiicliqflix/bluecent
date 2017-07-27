import User from '../models/user';
import { tokenForUser } from '../helpers/token';
import { sendVerificationEmail } from '../helpers/email';

export const login = (req, res, next) => {
  const { first, last, email, access_token, total, numContribs, lastContribDate } = req.user;
  res.json({ token: tokenForUser(req.user), first, last, email, access_token, total, numContribs, lastContribDate });
}

export const signup = (req, res, next) => {
  const { first, last, email, password } = req.body;

  if (!first || !last || !email || !password) {
    return res.status(422).send({ error: "All fields are required." });
  }

  User.findOne({ email }, (err, existingUser) => {
    if (err) { return next(err); }

    if (existingUser) {
      return res.status(422).send({ error: "Email already in use." });
    }

    let lastContribDate = moment().format('YYYY-MM-DD');
    const user = new User({ first, last, email, password, lastContribDate });

    user.save((err) => {
      if (err) { return next(err); }

      sendVerificationEmail(email, first, user.auth.token);
      res.json({ first, last, email });
    });
  });
}

export const verifyAccount = (req, res, next) => {
  const { email, token } = req.body;

  User.findOne({ email }, (err, user) => {
    if (err) { return next(err); }

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
      return res.status(422).send({ error: { message: "Something has gone wrong, please sign up again.", resend: false } });
    }

    User.findByIdAndUpdate(user.id, { role: 1, auth: { used: true } }, (err) => {
      if (err) { return next(err); }

      const { email, first, last } = user;

      res.json({ token: tokenForUser(user), email, first, last });
    });
  });
}

export const setupPayments = (req, res, next) => {
  console.log(req.body);
}
