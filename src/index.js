import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import logger from 'ttt-packages/lib/config/logger';
import customEnv from 'custom-env';
import mailRoutes from './mail.routes';

customEnv.env(process.env.NODE_ENV);

const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

const local = [
  'https://localhost:3000',
];
const stage = [
  'https://stage.api.timetotrain.fit',
];
const prod = [
  'https://api.timetotrain.fit',
];

// enable cors
app.use(cors({ credentials: true, origin: [...local, ...stage, ...prod] }));
app.options('*', cors());

// v2 api routes
app.use('/api/v2/mail', mailRoutes);

app.get('/api/mailer', (req, res) => {
  logger.debug('Health Monitor');
  res.status(httpStatus.OK).send('healthy');
});

app.listen(process.env.PORT, () => {
  logger.info(`Mail server started at port: ${process.env.PORT}`);
});
