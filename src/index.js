import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import httpStatus from 'http-status';
import logger from 'ttt-packages/lib/config/logger';
import customEnv from 'custom-env';
import mailRoutes from './mail.routes';
import morgan from 'ttt-packages/lib/plugins/morgan';

customEnv.env(process.env.NODE_ENV);

const app = express();

app.use(express.json({ extended: false }));
app.use(bodyParser.json());

app.use(morgan.successHandler);
app.use(morgan.errorHandler);

const local = [
  'https://localhost:3000',
];
const stage = [
  'https://stage.timetotrain.fit',
];
const prod = [
  'https://timetotrain.fit',
];

// enable cors
app.use(cors({ credentials: true, origin: [...local, ...stage, ...prod] }));
app.options('*', cors());

// v2 api routes
app.use('/api/v2/mail', mailRoutes);

app.get('/api/v2/mail/health', (req, res) => {
  logger.debug('Health Monitor');
  res.status(httpStatus.OK).send('healthy');
});

app.listen(process.env.PORT, () => {
  logger.info(`Mail server started at port: ${process.env.PORT}`);
});
