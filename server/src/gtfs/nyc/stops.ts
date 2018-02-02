import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';
import { createInterface } from 'readline';
import { Stop } from '../types';

const getStopsData = (): Promise<Stop[]> => new Promise((resolve, reject) => {
  const stops: Stop[] = [];
  const rl = createInterface({
    crlfDelay: global.Infinity,
    input: createReadStream(resolvePath(__dirname, '../../../data/nyc/stops.txt')),
  } as any);

  rl.on('line', (line: string) => {
    const [id, code, name, desc, lat, lon, zoneId, url, locationType, parentStation] = line.split(',');
    const stop: Stop = {
      id,
      code,
      desc,
      locationType,
      name,
      parentStation,
      url,
      zoneId,
      lat: Number.parseFloat(lat),
      lon: Number.parseFloat(lon),
    };

    stops.push(stop);
  });

  rl.on('error', e => reject(e));
  rl.on('close', () => resolve(stops));
});

const getNycStops = async () => getStopsData();

export default getNycStops;
