/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

Factory.define('enrollmentsList', () => Factory.buildList('enrollment', 3));

Factory.define('enrollment')
  .sequence('id')
  .sequence('institution', (i) => `Training Center ${i}`)
  .sequence('masterCourseName', (i) => `master course ${i}`)
  .sequence('masterCourseId', (i) => `master-course-id-${i}`)
  .sequence('ccxId', (i) => `ccx-course-${i}`)
  .sequence('ccxName', (i) => `ccx name ${i}`)
  .sequence('ccxCoachEmail', (i) => `coach${i}@example.com`)
  .sequence('learnerEmail', (i) => `lerner${i}@example.com`)
  .sequence('remainingCourseAccessDuration', (i) => {
    if (i === 1) { return 0; } if (i === 2) { return 60; } return 180;
  })
  .sequence('status', (i) => {
    if (i === 1) { return 'Inactive'; } if (i === 2) { return 'Active'; } return 'Pending';
  })
  .attr('created', '2022-01-14T16:15:10.758039Z');
