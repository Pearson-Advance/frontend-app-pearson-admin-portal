Course Operations Portal
=================================

 This MFE is the portal where all the usage of what `Course Operations Plugin <https://github.com/Pearson-Advance/course_operations>`_ provides is used.

Introduction
------------

This repository is the frontend part of the Course Operations project, where all actions are meant to be taken. The Portal provides this features:

* Actions:

CRU (Create, read and update) operations for Institutions, licenses, license orders and Institution Administrators.
Enabling/Disabling Enrollments.
Revoking Pending Enrollments (EnrollmentsAllowed).


* Reports:
Listing the enrollments, which can be filtered.
Listing the usage of seat per CCX and Master Course.


**Prerequisites**

`Devstack <https://github.com/Pearson-Advance/devstack>`_.
`Course Operations Plugin <https://github.com/Pearson-Advance/course_operations>`_.

**Installation and Startup**

1. Clone the repo:

  ``git clone https://github.com/Pearson-Advance/frontend-app-pearson-admin-portal``

2. Use node v12.x.

   The micro-frontend build scripts support node 12.  Using other major versions of node *may* work, but is unsupported.  For convenience, this repository includes an .nvmrc file to help in setting the correct node version via `nvm <https://github.com/nvm-sh/nvm>`_.

3. Install npm dependencies:

  ``cd frontend-app-pearson-admin-portal && npm install``

4. Start the dev server:

  ``npm start``

The dev server is running at `http://localhost:8090 <http://localhost:8090>`_ or whatever port you setup.
You can update the line `PORT=8080` in all .env.* files to set a different port.


**Testing**

  ``npm test``

Internationalization
--------------------

Please see `edx/frontend-platform's i18n module <https://edx.github.io/frontend-platform/module-Internationalization.html>`_ for documentation on internationalization.  The documentation explains how to use it, and the `How To <https://github.com/edx/frontend-i18n/blob/master/docs/how_tos/i18n.rst>`_ has more detail.

.. |Build Status| image:: https://api.travis-ci.com/edx/frontend-template-application.svg?branch=master
   :target: https://travis-ci.com/edx/frontend-template-application
.. |Codecov| image:: https://codecov.io/gh/edx/frontend-template-application/branch/master/graph/badge.svg
   :target: https://codecov.io/gh/edx/frontend-template-application
.. |license| image:: https://img.shields.io/npm/l/@edx/frontend-template-application.svg
   :target: @edx/frontend-template-application
