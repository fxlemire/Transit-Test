import { City } from './cities';
import getNycStops from './nyc/stops';

const getStops = async (city: City) => {
  let stops;

  switch (city) {
    case 'NYC':
      stops = await getNycStops();
      break;
    default:
      throw { status: 400, message: 'Bad request: invalid city parameter.' };
  }

  return stops;
};

export default getStops;
