import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import { Route, Switch } from 'react-router';
import { getConfig } from '@edx/frontend-platform';
import { Banner } from 'react-paragon-topaz';

import { InstitutionsPage } from 'features/institutions';
import { InstitutionAdminsPage } from 'features/institutionAdmins';
import { LicensesPage, LicenseDetail } from 'features/licenses';
import { StudentEnrollmentsPage } from 'features/enrollments';
import { DataReportPage } from 'features/dataReport/components/DataReportPage';
import { MenuBar } from 'features/shared/components/MenuBar';
import { GlobalFilters } from 'features/shared/components/GlobalFilters';

const Main = () => {
  const bannerText = getConfig().MAINTENANCE_BANNER_TEXT || '';

  const routes = [
    { path: '/', component: InstitutionsPage, exact: true },
    { path: '/institution-admins', component: InstitutionAdminsPage, exact: true },
    { path: '/licenses', component: LicensesPage, exact: true },
    { path: '/licenses/:id', component: LicenseDetail, exact: true },
    { path: '/enrollments', component: StudentEnrollmentsPage, exact: true },
    { path: '/data-report', component: DataReportPage, exact: true },
  ];

  return (
    <>
      <Header appID="header-component-admin" />
      {bannerText && (
      <Banner variant="warning" iconWarning text={bannerText} />
      )}
      <GlobalFilters />
      <MenuBar />
      <Switch>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            exact={route.exact}
            component={route.component}
          />
        ))}
      </Switch>
      <Footer />
    </>
  );
};

export default Main;
