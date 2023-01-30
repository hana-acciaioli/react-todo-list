import React from 'react';
import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext.js';
import { useParams, NavLink } from 'react-router-dom';
import { authUser } from '../../services/auth';

export default function Auth() {
  const { type } = useParams();
  const { user, setUser } = useContext(UserContext);

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const submitAuthHandler = async () => {
    try {
      const user = await authUser(email, password, type);
      setUser(user);
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
          <input value={email} onChange={(e) => setEmail(e.target.value)}></input>
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.targetValue)}></input>{' '}
        </div>
        <div>
          <button onClick={submitAuthHandler}>Submit</button>
        </div>
      </nav>
    </div>
  );
}
