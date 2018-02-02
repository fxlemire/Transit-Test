import { json, urlencoded } from 'body-parser';
import * as compress from 'compression';
import * as cors from 'cors';
import * as express from 'express';
import * as logger from 'morgan';
import getStops from './gtfs/stops';

const CLIENT_ORIGIN = 'http://localhost:3000';

const app = express();
const corsOptions: cors.CorsOptions = {
  origin: CLIENT_ORIGIN,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compress());
app.use(logger('dev'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 4000);

app.get('/stops/:city', (req, res) => {
  try {
    const stops = getStops(req.params.city);

    stops.pipe(res.status(200)).on('finish', res.end);
  } catch (error) {
    res.status(error.status || 500).send(error.status ? error.message : 'An unexpected error occurred.');
  }
});

export default app;
