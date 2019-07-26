import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { SignUpLink } from '../SignUp';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
  <div>
    <h1>Sign In</h1>
    <SignInForm />
    <SignUpLink />
  </div>
);

const INITIAL_STATE = {
  email: '',
  password: '',
  error: null
};

const SignInFormBase = ({ firebase, history }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });
  const onSubmit = async e => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      await firebase.doSignInWithEmailAndPassword(email, password);
      setFormData({ ...INITIAL_STATE });
      history.push(ROUTES.HOME);
    } catch (err) {
      console.log(err);
      setFormData({ ...formData, error: err });
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { email, password, error } = formData;

  const isInvalid = password === '' || email === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="password"
        value={password}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <button disabled={isInvalid} type="submit">
        Sign in
      </button>
      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignInForm = compose(
  withRouter,
  withFirebase
)(SignInFormBase);

export default SignInPage;

export { SignInForm };
