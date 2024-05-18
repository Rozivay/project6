import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser } from './userSlice'; 

export function User({ user }) {
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteUser(user.id));
  };

  return (
    <div>
      <h3>{user.name}</h3>
      <p>EMAIL: {user.email}</p>
      <p>PHONE NUMBER: {user.phone}</p>
      <button onClick={handleDelete}>Удалить</button>
    </div>
  );
}