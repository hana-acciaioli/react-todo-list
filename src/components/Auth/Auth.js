import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { useParams, NavLink, Redirect } from 'react-router-dom';
import { authUser } from '../../services/auth';

export default function Auth() {
  const { type } = useParams();

  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (user) {
    return <Redirect to="/todos" />;
  }
  console.log(user);

  const submitAuthHandler = async () => {
    try {
      const newUser = await authUser(email, password, type);
      setUser(newUser);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="auth-container">
      <nav>
        <NavLink to="/auth/sign-up">Sign Up</NavLink>
        <NavLink to="/auth/sign-in">Sign In</NavLink>
        <div>
          <label>Email</label>
          <input
            className="input"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            className="input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></input>{' '}
        </div>
        <div>
          <button onClick={submitAuthHandler}>Submit</button>
        </div>
      </nav>
    </div>
  );
}
