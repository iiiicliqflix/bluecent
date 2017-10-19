import passport from 'passport';
import passportService from './services/passport';
import {
  getAccessToken,
  getTransactions,
  getPublicToken
} from './controllers/financeController';
import {
  login,
  signup,
  verifyAccount,
  setupPayments
} from './controllers/authController';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.post('/get_access_token', getAccessToken);
  app.post('/signup', signup);
  app.post('/signup/verify-account', verifyAccount);
  app.post('/login', requireLogin, login);
  app.post('/setup-payments', setupPayments);
  app.get('/get_transactions', getTransactions);
  app.get('/get_public_token', getPublicToken);
};

export default router;
