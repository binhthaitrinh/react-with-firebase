import React from 'react';
import { withAuthorization } from '../Session';

const HomePage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <p>Home page is acccessible by signed in user</p>
    </div>
  );
};

const condition = authUser => !!authUser;

export default withAuthorization(condition)(HomePage);
