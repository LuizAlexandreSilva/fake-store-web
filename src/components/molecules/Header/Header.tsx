import React, { useContext } from 'react';
import { AuthContext } from '../../../contexts/auth';

function Header() {
  const { signOut, user } = useContext(AuthContext);

  return (
    <header className="w-screen bg-orange-400 h-14 flex items-center">
      <div className="container mx-auto">
        <div className="flex justify-between">
          <h2 className="text-3xl text-white font-bold">Fake Store</h2>
          <div className="flex items-center">
            <span className="text-white">
              Hello, <strong>{user?.name.firstname}</strong>!
            </span>
            <button
              className="ml-3 text-white bg-indigo-600 hover:bg-indigo-700 py-2 px-4 border border-transparent text-sm font-medium rounded-md "
              type="button"
              onClick={signOut}
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
