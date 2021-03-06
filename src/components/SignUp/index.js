import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

const SignUpPage = () => (
  <div>
    <h1>Sign Up</h1>
    <SignUpForm />
  </div>
);

const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  isAdmin: false,
  error: null
};

const SignUpFormBase = ({ firebase, history }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  const onSubmit = async e => {
    e.preventDefault();
    const { username, email, passwordOne, isAdmin } = formData;
    const roles = {};

    if (isAdmin) {
      roles[ROLES.ADMIN] = ROLES.ADMIN;
    }

    try {
      const authUser = await firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne
      );
      await firebase.user(authUser.user.uid).set({ username, email, roles });
      await firebase.doSendEmailVertification();
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

  const onChangeCheckbox = e => {
    setFormData({ ...formData, [e.target.name]: e.target.checked });
  };

  const {
    username,
    email,
    passwordOne,
    passwordTwo,
    isAdmin,
    error
  } = formData;

  const isInvalid =
    passwordOne !== passwordTwo ||
    passwordOne === '' ||
    email === '' ||
    username === '';
  return (
    <form onSubmit={onSubmit}>
      <input
        name="username"
        value={username}
        onChange={onChange}
        type="text"
        placeholder="Full Name"
      />
      <input
        name="email"
        value={email}
        onChange={onChange}
        type="text"
        placeholder="Email Address"
      />
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="Password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Confirm Password"
      />
      <label>
        Admin:{' '}
        <input
          name="isAdmin"
          type="checkbox"
          checked={isAdmin}
          onChange={onChangeCheckbox}
        />
      </label>
      <button disabled={isInvalid} type="submit">
        Sign up
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

const SignUpForm = compose(
  withRouter,
  withFirebase
)(SignUpFormBase);

const SignUpLink = () => (
  <p>
    Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
  </p>
);

export default SignUpPage;

export { SignUpForm, SignUpLink };
