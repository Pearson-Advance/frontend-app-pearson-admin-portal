import MockAdapter from 'axios-mock-adapter';
import { Factory } from 'rosie';
import { getAuthenticatedHttpClient } from '@edx/frontend-platform/auth';
import { initializeMockApp } from '@edx/frontend-platform/testing';
import { fetchInstitutions, createInstitution, editInstitution } from 'features/institutions/data/thunks';
import { openModalForm, closeModalForm, postInstitutionSuccess } from 'features/institutions/data/slices';
import { executeThunk } from 'test-utils';
import { initializeStore } from 'store';

import 'features/institutions/data/__factories__';

const institutionsApiUrl = `${process.env.COURSE_OPERATIONS_API_BASE_URL}/institutions/`;
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

  test('successful institutions retrieval', async () => {
    axiosMock.onGet(institutionsApiUrl)
      .reply(200, Factory.build('institutionsList'));

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutions(), store.dispatch, store.getState);

    expect(store.getState().institutions.data)
      .toEqual([
        {
          id: 1, name: 'Training Center 1', shortName: 'TC1', active: true,
        },
        {
          id: 2, name: 'Training Center 2', shortName: 'TC2', active: true,
        },
      ]);

    expect(store.getState().institutions.status)
      .toEqual('successful');
  });

  test('failed institutions retrieval', async () => {
    axiosMock.onGet(institutionsApiUrl)
      .reply(500);

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(fetchInstitutions(), store.dispatch, store.getState);

    expect(store.getState().institutions.data)
      .toEqual([]);

    expect(store.getState().institutions.status)
      .toEqual('failed');
  });

  test('successful institution creation', async () => {
    const institution = Factory.build('institution');

    axiosMock.onPost(institutionsApiUrl)
      .reply(201, institution);

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(
      createInstitution(institution.name, institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().institutions.data)
      .toEqual([{
        id: 1, name: 'Training Center 1', shortName: 'TC1', active: true,
      }]);

    expect(store.getState().institutions.status)
      .toEqual('successful');
  });

  test('failed institution creation', async () => {
    const institution = Factory.build('institution');
    const expected = { name: 'This field may not be blank.' };

    axiosMock.onPost(institutionsApiUrl)
      .reply(500, expected);

    expect(store.getState().institutions.status)
      .toEqual('in-progress');

    await executeThunk(
      createInstitution('', institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().institutions.status)
      .toEqual('failed');

    expect(store.getState().institutions.form.errors)
      .toEqual(expected);
  });

  test('successful institution update', async () => {
    const institution = Factory.build('institution');

    axiosMock.onPost(institutionsApiUrl)
      .reply(201, institution);

    await executeThunk(
      createInstitution(institution.name, institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    institution.active = false;
    institution.name = 'Training Center 1 changed';

    axiosMock.onPatch(`${institutionsApiUrl}${institution.id}/`)
      .reply(201, institution);

    await executeThunk(
      editInstitution(institution.id, institution.name, institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().institutions.data)
      .toEqual([{
        id: 1, name: 'Training Center 1 changed', shortName: 'TC1', active: false,
      }]);

    expect(store.getState().institutions.status)
      .toEqual('successful');
  });

  test('failed institution update', async () => {
    const institution = Factory.build('institution');
    const expected = { name: 'Institution with this short name already exists.' };

    axiosMock.onPost(institutionsApiUrl)
      .reply(201, institution);

    await executeThunk(
      createInstitution(institution.name, institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    institution.active = false;
    institution.name = 'Training Center 1 changed';

    axiosMock.onPatch(`${institutionsApiUrl}${institution.id}/`)
      .reply(500, expected);

    await executeThunk(
      editInstitution(institution.id, institution.name, institution.shortName, institution.active),
      store.dispatch,
      store.getState,
    );

    expect(store.getState().institutions.data)
      .toEqual([{
        id: 1, name: 'Training Center 1', shortName: 'TC1', active: true,
      }]);

    expect(store.getState().institutions.status)
      .toEqual('failed');

    expect(store.getState().institutions.form.errors)
      .toEqual(expected);
  });

  test('open modal with edit.', async () => {
    const institution = Factory.build('institution');

    store.dispatch(postInstitutionSuccess(institution));

    const beforeStore = store.getState().institutions;
    const expected = {
      ...beforeStore,
      form: {
        ...beforeStore.form,
        isOpen: true,
        institution,
      },
    };

    store.dispatch(openModalForm(institution));

    expect(store.getState().institutions).toEqual(expected);
  });

  test('open modal for creation.', () => {
    const beforeStore = store.getState().institutions;
    const expected = {
      ...beforeStore,
      form: {
        ...beforeStore.form,
        isOpen: true,
      },
    };

    store.dispatch(openModalForm());

    expect(store.getState().institutions).toEqual(expected);
  });

  test('close modal for creation.', () => {
    const beforeStore = store.getState().institutions;
    const expected = {
      ...beforeStore,
      form: {
        ...beforeStore.form,
        isOpen: false,
      },
    };

    store.dispatch(openModalForm());

    store.dispatch(closeModalForm());

    expect(store.getState().institutions).toEqual(expected);
  });
});
