/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('ccxReportList', () => Factory.buildList('ccxReport', 3));

Factory.define('ccxReport')
  .sequence('institution', (i) => `Training Center ${i}`)
  .sequence('masterCourse', (i) => `course-v1:demo+demo+202${i}`)
  .sequence('purchasedSeats', (i) => i)
  .sequence('ccxId', (i) => `ccx-v1:demo+demo1+2021+ccx@${i}`)
  .sequence('ccxName', (i) => `CCX-${i}`)
  .sequence('institutionAdmin', (i) => `admin-${i}`)
  .sequence('totalEnrolled', (i) => i);
