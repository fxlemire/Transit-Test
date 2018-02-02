import { PassThrough } from 'stream';

import getNycStops from './nyc/stops';
import { City } from './types';

const getStops = (city: City): PassThrough => {
  switch (city) {
    case 'NYC':
      return getNycStops();
    default:
      throw { status: 400, message: 'Bad request: invalid city parameter.' };
  }
};

export default getStops;
