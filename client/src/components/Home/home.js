import { withRouter } from 'react-router-dom';
import React, { Fragment } from 'react';

import SideMenu from '../SideMenu';

const Home = () => {
  const isLoggedIn = localStorage.getItem('USER_ID');

  return (
    <Fragment>
      <SideMenu />
      <div>test</div>
    </Fragment>
  );
};

export default withRouter(Home);