import passport from 'passport';
import { getAccessToken, getAuth } from './controllers/plaidController';
import { login, signup, verifyAccount } from './controllers/authController';
import passportService from './services/passport';

const requireAuth = passport.authenticate('jwt', { session: false });
const requireLogin = passport.authenticate('local', { session: false });

const router = (app) => {
  app.post('/get_access_token', getAccessToken);
  app.get('/auth', getAuth);
  app.post('/signup', signup);
  app.post('/signup/verify-account', verifyAccount);
  app.post('/login', requireLogin, login);
};

export default router;
