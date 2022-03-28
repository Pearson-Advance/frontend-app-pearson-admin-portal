/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('licenseList', () => Factory.buildList('license', 2));

Factory.define('license')
  .sequence('id')
  .sequence('institution', (i) => ({
    id: `${i}`,
    name: `Training Center ${i}`,
    shortName: `TC${i}`,
  }))
  .sequence('courses', (i) => [
    {
      id: `course-v1:PX+0${i}+2021`,
      displayName: `TC${i}`,
    },
  ])
  .sequence('purchasedSeats', (i) => i)
  .sequence('courseAccessDuration', (i) => i * 10)
  .attr('status', 'active')
  .attr('licenseOrder', () => []);

Factory.define('licenseOrder')
  .sequence('id')
  .sequence('orderReference', (i) => i)
  .sequence('purchasedSeats', (i) => i)
  .attr('active', true);
