/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('institutionsList', () => Factory.buildList('institution', 2));

Factory.define('institution')
  .sequence('id')
  .sequence('name', (i) => `Training Center ${i}`)
  .sequence('shortName', (i) => `TC${i}`)
  .sequence('uuid', (i) => `uuid-12345 ${i}`)
  .attr('active', true);
