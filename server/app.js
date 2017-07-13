import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import { mongoConfig } from './config';

const app = express();

app.use((req, res, next) => {
  let sslUrl;

  if (process.env.NODE_ENV === 'production' &&
    req.headers['x-forwarded-proto'] !== 'https') {
    console.log('redirecting');
    sslUrl = ['https://www.bluecent.org', req.url].join('');
    return res.redirect(sslUrl);
  }

  return next();
});

const staticFiles = express.static(path.join(__dirname, '../../client/build'));
app.use(staticFiles);

if (process.env.NODE_ENV === 'production') {
  mongoose.connect(process.env.MONGODB_URI);
} else {
  mongoose.connect(mongoConfig.db);
}

mongoose.set('debug', true);
app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);
app.use('/*', staticFiles);

app.set('port', (process.env.PORT || 8000));
app.listen(app.get('port'));
