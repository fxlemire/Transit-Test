import { json, urlencoded } from 'body-parser';
import * as compress from 'compression';
import * as express from 'express';
import * as logger from 'morgan';
import getStops from './gtfs/stops';

const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(compress());
app.use(logger('dev'));
app.set('env', process.env.NODE_ENV || 'development');
app.set('port', process.env.PORT || 4000);

app.get('/stops', async (req, res) => {
  try {
    const stops = await getStops(req.query.city);

    res.status(200).send(stops);
  } catch (error) {
    res.status(error.status || 500).send(error.status ? error.message : 'An unexpected error occurred.');
  }
});

export default app;
