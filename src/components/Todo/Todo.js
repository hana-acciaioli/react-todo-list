import React from 'react';
import { UserContext } from '../../context/UserContext.js';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
export default function Todo() {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Redirect to="/auth/sign-in" />;
  }
  return <div>Todo</div>;
}
