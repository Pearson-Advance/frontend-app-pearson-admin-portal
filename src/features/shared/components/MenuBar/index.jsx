import React from 'react';

import Nav from '@edx/paragon/dist/Nav';
import { useHistory } from 'react-router';
import { useSelector } from 'react-redux';
import { selectPage } from 'features/shared/data/selectors';

import './index.scss';

const MenuBar = () => {
  const { tab } = useSelector(selectPage);
  const history = useHistory();
  const onLinkClick = (e) => {
    e.preventDefault();

    if (e.currentTarget.pathname !== history.location.pathname) {
      history.push(e.currentTarget.pathname);
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
    </Nav>
  );
};

export { MenuBar };
