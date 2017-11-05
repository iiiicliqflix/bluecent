import envvar from 'envvar';

const EMAIL_ADDRESS = envvar.string('EMAIL_ADDRESS');
const EMAIL_PASSWORD = envvar.string('EMAIL_PASSWORD');
const stripeLiveKey = envvar.string('STRIPE_LIVE_KEY');
const stripeTestKey = envvar.string('STRIPE_TEST_KEY');
const dbSecret = envvar.string('DB_SECRET');

export const mongoConfig = {
  secret: dbSecret,
  db: 'mongodb://localhost/bluecent'
};

export const emailConfig = {
  service: 'Gmail',
  auth: {
    user: EMAIL_ADDRESS,
    pass: EMAIL_PASSWORD
  }
};

export const stripeKeys = {
  live: stripeLiveKey,
  test: stripeTestKey
};
