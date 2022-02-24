import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchInstitutionAdmins, createInstitutionAdmin, editInstitutionAdmin } from 'features/institutionAdmins/data/thunks';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/institutionAdmins/data/__factories__';

const institutionAdminsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institution-admin/`;
let axiosMock;
let store;

describe('Institutions data layer tests', () => {
  beforeEach(() => {
    initializeMockApp({
      authenticatedUser: {
        userId: 1,
        username: 'testuser',
        administrator: true,
        roles: [],
      },
    });
    axiosMock = new MockAdapter(getAuthenticatedHttpClient());

    Factory.resetAll();
    store = initializeStore();
  });

  afterEach(() => {
    axiosMock.reset();
  });

  test('successful institution admins retrieval', async () => {
    const admins = Factory.build('adminList');

    axiosMock.onGet(institutionAdminsApiUrl)
      .reply(200, admins);

    expect(store.getState().admins.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutionAdmins(), store.dispatch, store.getState);

    expect(store.getState().admins.data)
      .toEqual(admins);

    expect(store.getState().admins.status)
      .toEqual('successful');
  });

  test('failed institution admins retrieval', async () => {
    axiosMock.onGet(institutionAdminsApiUrl)
      .reply(500);

    expect(store.getState().admins.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutionAdmins(), store.dispatch, store.getState);

    expect(store.getState().admins.data)
      .toEqual([]);

    expect(store.getState().admins.status)
      .toEqual('failed');
  });

  test('successful institution creation', async () => {
    const admin = Factory.build('admin');

    axiosMock.onPost(institutionAdminsApiUrl)
      .reply(201, admin);

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(
      createInstitutionAdmin(admin.institution.id, admin.user.email),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().admins.data)
      .toEqual([admin]);

    expect(store.getState().admins.status)
      .toEqual('successful');
  });

  test('failed institution admin creation', async () => {
    const admin = Factory.build('admin');
    const expected = { institutionId: 'This field may not be blank.' };

    axiosMock.onPost(institutionAdminsApiUrl)
      .reply(500, expected);

    expect(store.getState().admins.status)
      .toEqual('in-progress');

    await executeThunk(
      createInstitutionAdmin('', admin.user.email),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().admins.status)
      .toEqual('failed');

    expect(store.getState().admins.form.errors)
      .toEqual(expected);
  });

  test('successful institution admin update', async () => {
    const admin = Factory.build('admin');

    axiosMock.onPost(institutionAdminsApiUrl)
      .reply(201, admin);

    await executeThunk(
      createInstitutionAdmin(admin.institution.id, admin.user.email),
      store.dispatch,
      store.getState,
    );

    admin.active = false;

    axiosMock.onPatch(`${institutionAdminsApiUrl}${admin.id}/`)
      .reply(201, admin);

    await executeThunk(
      editInstitutionAdmin(admin.id, admin.active),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().admins.data)
      .toEqual([admin]);

    expect(store.getState().admins.status)
      .toEqual('successful');
  });

  test('failed institution admin update', async () => {
    const admin = Factory.build('admin');
    const expected = { institutionId: 'This field may not be blank.' };

    axiosMock.onPost(institutionAdminsApiUrl)
      .reply(201, admin);

    await executeThunk(
      createInstitutionAdmin(admin.institution.id, admin.user.email),
      store.dispatch,
      store.getState,
    );

    axiosMock.onPatch(`${institutionAdminsApiUrl}${admin.id}/`)
      .reply(500, expected);

    await executeThunk(
      editInstitutionAdmin(admin.id, false),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().admins.data)
      .toEqual([admin]);

    expect(store.getState().admins.status)
      .toEqual('failed');
  });
});
