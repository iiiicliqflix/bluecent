import envvar from 'envvar';

const EMAIL_ADDRESS = envvar.string('EMAIL_ADDRESS');
const EMAIL_PASSWORD = envvar.string('EMAIL_PASSWORD');

export const mongoConfig = {
  secret: 'SomeSecret',
  db: 'mongodb://localhost/bluecent'
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
};

let STRIPE_KEY = null;
if (process.env.NODE_ENV === 'production') {
  STRIPE_KEY = envvar.string('STRIPE_LIVE_KEY');
} else {
  STRIPE_KEY = envvar.string('STRIPE_TEST_KEY');
}

export STRIPE_KEY;
