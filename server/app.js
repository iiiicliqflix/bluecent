import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';
import mongoose from 'mongoose';
import router from './router';
import { mongoConfig } from './config';

const app = express();

mongoose.connect(mongoConfig.db);
mongoose.set('debug', true);

app.use(compression());
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
router(app);

app.listen(8000);
