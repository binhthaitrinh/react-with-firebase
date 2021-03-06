import React from 'react';
import { withAuthorization, withEmailVerification } from '../Session';

import { compose } from 'recompose';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page is acccessible by signed in user</p>
    </div>
  );
};

const condition = authUser => !!authUser;

export default compose(
  withEmailVerification,
  withAuthorization(condition)
)(HomePage);
