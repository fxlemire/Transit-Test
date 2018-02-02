import { createReadStream } from 'fs';
import { resolve as resolvePath } from 'path';
import { createInterface } from 'readline';
import { PassThrough } from 'stream';
import { Stop } from '../types';

const getStopsData = (): PassThrough => {
  let isFirstLine = true;
  const stopsStream = new PassThrough();
  const rl = createInterface({
    crlfDelay: global.Infinity,
    input: createReadStream(resolvePath(__dirname, '../../../data/nyc/stops.txt')),
  } as any);

  rl.on('line', (line: string) => {
    if (isFirstLine) {
      isFirstLine = false;
      return;
    }

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

    stopsStream.push(JSON.stringify(stop));
  });

  rl.on('close', () => stopsStream.push(null)); // tslint:disable-line no-null-keyword

  return stopsStream;
};

const getNycStops = () => getStopsData();

export default getNycStops;
