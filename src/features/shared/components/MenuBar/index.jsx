import React from 'react';

import Nav from '@openedx/paragon/dist/Nav';
import { useNavigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPage } from 'features/shared/data/selectors';

import './index.scss';

const MenuBar = () => {
  const { tab } = useSelector(selectPage);
  const navigate = useNavigate();
  const location = useLocation();

  const onLinkClick = (e) => {
    e.preventDefault();

    const { pathname } = e.currentTarget;

    if (pathname !== location.pathname) {
      navigate(pathname);
    }
  };

  return (
    <Nav variant="pills" activeKey={tab} className="justify-content-center menu-bar">
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="1" href="/">
          Institutions
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="2" href="/institution-admins">
          Institution Administrators
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="3" href="/licenses">
          Licenses
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="4" href="/data-report">
          Data Report
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="5" href="/enrollments">
          Enrollments
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export { MenuBar };
