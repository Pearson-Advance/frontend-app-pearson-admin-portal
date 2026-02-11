import 'regenerator-runtime/runtime';
import {
  APP_INIT_ERROR, APP_READY, subscribe, initialize,
} from '@edx/frontend-platform';
import { AppProvider, ErrorPage } from '@edx/frontend-platform/react';
import ReactDOM from 'react-dom/client';
import { messages as headerMessages } from '@edx/frontend-component-header';
import { messages as footerMessages } from '@edx/frontend-component-footer';
import Main from 'features/Main';
import { store } from './store';
import appMessages from './i18n';

import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));

subscribe(APP_READY, () => {
  root.render(
    <AppProvider store={store}>
      <Main />
    </AppProvider>,
  );
});

subscribe(APP_INIT_ERROR, (error) => {
  root.render(<ErrorPage message={error.message} />);
});

initialize({
  messages: [
    appMessages,
    headerMessages,
    footerMessages,
  ],
  requireAuthenticatedUser: true,
});
