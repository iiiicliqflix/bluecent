import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import schedule from 'node-schedule';
import router from './router';
import { mongoConfig } from './config';
import { chargeUsers } from './controllers/plaidController';

const app = express();

// Force SSL
app.use((req, res, next) => {
  let sslUrl;

  if (process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https') {
    sslUrl = ['https://www.bluecent.org', req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
});

// Use client build
const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

// MongoDB Config
if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(mongoConfig.db);
}

// Charge stripe accounts every week
// schedule.scheduleJob({hour: 14, minute: 30, dayOfWeek: 0}, function() {
//   console.log('Charging stripe accounts.');
//   chargeUsers();
// });

// let rule = new schedule.RecurrenceRule();
// rule.second = 0;
// schedule.scheduleJob(rule, function() {
//   chargeUsers();
// });

// App settings
mongoose.set('debug', true);
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);
app.use('/*', staticFiles);

// Listen on port 8000
app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
