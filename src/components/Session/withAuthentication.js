import React, { useState, useEffect } from 'react';

import AuthUserContext from './context';
import { withFirebase } from '../Firebase';

const withAuthentication = Component => {
  const WithAuthentication = props => {
    const [authUser, setAuthUser] = useState(null);
    useEffect(() => {
      const listener = props.firebase.onAuthUserListener(
        authUser => {
          setAuthUser(authUser);
        },
        () => {
          setAuthUser(null);
        }
      );
      return listener;
    });
    return (
      <AuthUserContext.Provider value={authUser}>
        <Component {...props} />
      </AuthUserContext.Provider>
    );
  };
  return withFirebase(WithAuthentication);
};

export default withAuthentication;
