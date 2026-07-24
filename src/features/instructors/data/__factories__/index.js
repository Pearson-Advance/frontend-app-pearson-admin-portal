/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('instructorsList', () => Factory.buildList('instructor', 3));

Factory.define('instructor')
  .sequence('id')
  .sequence('username', (i) => `instructor_user_${i}`)
  .sequence('email', (i) => `instructor${i}@example.com`)
  .sequence('name', (i) => `Instructor Name ${i}`)
  .sequence('institution', (i) => `Institution ${i}`)
  .attr('isStaff', true)
  .attr('created', '2026-01-01T10:00:00.000000Z');
