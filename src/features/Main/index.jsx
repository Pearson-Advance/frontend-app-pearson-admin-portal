import Header from '@edx/frontend-component-header';
import Footer from '@edx/frontend-component-footer';
import { Routes, Route } from 'react-router-dom';
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
    { path: '/', element: <InstitutionsPage /> },
    { path: '/institution-admins', element: <InstitutionAdminsPage /> },
    { path: '/licenses', element: <LicensesPage /> },
    { path: '/licenses/:id', element: <LicenseDetail /> },
    { path: '/enrollments', element: <StudentEnrollmentsPage /> },
    { path: '/data-report', element: <DataReportPage /> },
  ];

  return (
    <>
      <Header appID="header-component-admin" />

      {bannerText && (
        <Banner variant="warning" iconWarning text={bannerText} />
      )}

      <GlobalFilters />
      <MenuBar />

      <Routes>
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            element={route.element}
          />
        ))}
      </Routes>

      <Footer />
    </>
  );
};

export default Main;
