import React, { useState, useEffect } from 'react';

import { withFirebase } from '../Firebase';

const AdminPage = ({ firebase }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    firebase.users().on('value', snapshot => {
      const usersObject = snapshot.val();
      console.log(usersObject);

      const usersList = Object.keys(usersObject).map(key => ({
        ...usersObject[key],
        uid: key
      }));
      setUsers(usersList);
      console.log(usersList);
      setLoading(false);
    });
    return () => firebase.users().off();
  }, [firebase]);
  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading...</div>}
      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map(user => (
      <li key={user.uid}>
        <span>
          <strong>ID: </strong>
          {user.uid}
        </span>
        <span>
          <strong>Email: </strong>
          {user.email}
        </span>
        <span>
          <strong>Username: </strong>
          {user.username}
        </span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
