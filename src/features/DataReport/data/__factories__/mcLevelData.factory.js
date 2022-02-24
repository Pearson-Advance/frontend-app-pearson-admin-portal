/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('mcReportList', () => Factory.buildList('mcReport', 3));

Factory.define('mcReport')
  .sequence('institution', (i) => `Training Center ${i}`)
  .sequence('masterCourseId', (i) => `master-course-id-${i}`)
  .sequence('purchasedSeats', (i) => i)
  .sequence('totalEnrolled', (i) => i);
