import getNycStops from './nyc/stops';
import { City, Stop } from './types';

const getStops = async (city: City): Promise<Stop[]> => {
  let stops: Stop[];

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
