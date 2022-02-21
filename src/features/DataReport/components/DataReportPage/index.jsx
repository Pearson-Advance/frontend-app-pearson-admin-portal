import { Container, Tab, Tabs } from '@edx/paragon';
import React, { useState, useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { managedCoursesForSelect } from 'features/licenses/data/selectors';
import { DataReportTab, TabIndex } from 'features/shared/data/constants';
import { changeTab } from 'features/shared/data/slices';
import { allInstitutionsForSelect } from 'features/institutions/data/selector';
import { fetchInstitutions } from 'features/institutions/data/thunks';
import { Filters } from '../Filters';
import { LicenseUsageCCXLevel } from '../LicenseUsageCCXLevel';

const initialFiltersState = {
  institutionId: null,
  masterCourseId: null,
  page: 1,
};

export const DataReportPage = () => {
  const dispatch = useDispatch();
  const [dataReportTab, setDataReport] = useState(DataReportTab.CCX_LEVEL);
  const [filters, setFilters] = useState(initialFiltersState);
  const managedCourses = useSelector(managedCoursesForSelect);
  const institutions = useSelector(allInstitutionsForSelect);
  const pageTab = useSelector(state => state.page.tab);

  const handleChangeDataReportTab = tab => setDataReport(tab);

  const handleCleanFilters = () => {
    setFilters(initialFiltersState);
  };

  useEffect(() => {
    if (pageTab !== TabIndex.DATA_REPORT) { dispatch(changeTab(TabIndex.DATA_REPORT)); }
    if (institutions.length === 0) { dispatch(fetchInstitutions()); }
  }, [dispatch]);

  return (
    <Container className="pt-3">
      <Filters
        managedCourses={managedCourses}
        institutions={institutions}
        filters={filters}
        setFilters={setFilters}
        handleCleanFilters={handleCleanFilters}
      />
      <Tabs
        className="pt-3"
        activeKey={dataReportTab}
        variant="pills"
        onSelect={handleChangeDataReportTab}
      >
        <Tab eventKey="CCXLevel" title="CCX Level">
          {dataReportTab === DataReportTab.CCX_LEVEL && (
            <LicenseUsageCCXLevel filters={filters} />
          )}
        </Tab>
        {/* <Tab eventKey="MCLevel" title="MC Level">
          MC level license usage
          ## Leaving this as reference.
        </Tab> */}
      </Tabs>
    </Container>
  );
};
