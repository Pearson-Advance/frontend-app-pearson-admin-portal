import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom';
import Header, { messages as headerMessages } from '@edx/frontend-component-header';
import Footer, { messages as footerMessages } from '@edx/frontend-component-footer';
import { Route, Switch } from 'react-router';
import { InstitutionsPage } from 'features/institutions';
import { InstitutionAdminsPage } from 'features/institutionAdmins';
import { LicensesPage } from 'features/licenses';
import { MenuBar } from 'features/shared/components/MenuBar';
import { store } from './store';
import appMessages from './i18n';

import './index.scss';

subscribe(APP_READY, () => {
  ReactDOM.render(
    <AppProvider store={store}>
      <Header />
      <MenuBar />
      <Switch>
        <Route path="/" exact component={InstitutionsPage} />
        <Route path="/institution-admin" exact component={InstitutionAdminsPage} />
        <Route path="/license" exact component={LicensesPage} />
      </Switch>
      <Footer />
    </AppProvider>,
    document.getElementById('root'),
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  ReactDOM.render(<ErrorPage message={error.message} />, document.getElementById('root'));
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
