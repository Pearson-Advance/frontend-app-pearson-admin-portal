/* eslint-disable import/no-extraneous-dependencies */
import { Factory } from 'rosie';

import 'features/institutions/data/__factories__';

Factory.define('user')
  .sequence('id')
  .sequence('username', (i) => `USER ${i}`)
  .sequence('email', (i) => `user${i}@example.com`);

Factory.define('adminList', () => Factory.buildList('admin', 2));

Factory.define('admin')
  .sequence('id')
  .attr('institution', () => Factory.build('institution'))
  .attr('user', () => Factory.build('user'))
  .attr('active', true);
