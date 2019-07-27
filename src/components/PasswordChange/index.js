import React, { useState } from 'react';

import { withFirebase } from '../Firebase';

const INITIAL_STATE = {
  passwordOne: '',
  passwordTwo: '',
  error: null
};

const PasswordChangeForm = ({ firebase }) => {
  const [formData, setFormData] = useState({ ...INITIAL_STATE });

  const onSubmit = async e => {
    e.preventDefault();
    const { passwordOne } = formData;

    try {
      await firebase.doPasswordUpdate(passwordOne);
      setFormData({ ...INITIAL_STATE });
    } catch (err) {
      setFormData({ ...formData, error: err });
    }
  };

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { passwordOne, passwordTwo, error } = formData;

  const isInvalid = passwordOne !== passwordTwo || passwordOne === '';

  return (
    <form onSubmit={onSubmit}>
      <input
        name="passwordOne"
        value={passwordOne}
        onChange={onChange}
        type="password"
        placeholder="New password"
      />
      <input
        name="passwordTwo"
        value={passwordTwo}
        onChange={onChange}
        type="password"
        placeholder="Cinform New password"
      />
      <button disabled={isInvalid} type="submit">
        Reset my Password
      </button>

      {error && <p>{error.message}</p>}
    </form>
  );
};

export default withFirebase(PasswordChangeForm);
