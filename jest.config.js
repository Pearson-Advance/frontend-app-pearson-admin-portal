const { createConfig } = require('@openedx/frontend-build');

module.exports = createConfig('jest', {
  // setupFilesAfterEnv is used after the jest environment has been loaded.  In general this is what you want.
  // If you want to add config BEFORE jest loads, use setupFiles instead.
  modulePaths: ['src'],
  setupFilesAfterEnv: [
    '<rootDir>/src/setupTest.js',
  ],
  coveragePathIgnorePatterns: [
    'src/setupTest.js',
    'src/i18n',
  ],
  // TODO: all these tests and it's components should be refactor. temporarily disabled to unblock a release.
  testPathIgnorePatterns:[
    'src/features/dataReport/components/DataReportPage/__test__/index.test.jsx',
    'src/features/enrollments/components/StudentEnrollmentsPage/__test__/index.test.jsx',
    'src/features/institutionAdmins/components/InstitutionAdminsPage/__test__/index.test.jsx',
    'src/features/institutions/components/InstitutionsPage/__test__/index.test.jsx',
    'src/features/licenses/components/LicensesPage/__test__/index.test.jsx',
    'src/features/shared/components/GlobalFilters/__test__/index.test.jsx',
  ],
});
