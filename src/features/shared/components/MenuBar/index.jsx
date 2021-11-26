import React from 'react';
import Nav from '@edx/paragon/dist/Nav';
import { useHistory } from 'react-router';

import './index.scss';

const MenuBar = () => {
  const history = useHistory();
  const onLinkClick = (e) => {
    e.preventDefault();
    history.push(e.currentTarget.pathname);
  };

  return (
    <Nav variant="pills" activeKey="2" className="justify-content-center menu-bar">
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="1" href="/">
          Home
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="2" href="/institution">
          Institutions
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="3" href="/institution-admin">
          Institution Administrators
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="4" href="/license">
          Licenses
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link onClick={onLinkClick} eventKey="5" href="/data-report">
          Data Report
        </Nav.Link>
      </Nav.Item>
    </Nav>
  );
};

export { MenuBar };
