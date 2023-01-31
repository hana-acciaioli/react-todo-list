import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../../context/UserContext.js';
import { signOut } from '../../../services/auth.js';

export default function Header() {
  const { user, setUser } = useContext(UserContext);
  const signOutHandler = async () => {
    try {
      await signOut();
      setUser(null);
    } catch (e) {
      console.error(e.message);
    }
  };
  return (
    <div>
      <nav>
        <div>
          {user && (
            <>
              <p>HELLO, {user.email} </p>
              <button className="sign-out-button" onClick={signOutHandler}>
                Sign Out
              </button>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
