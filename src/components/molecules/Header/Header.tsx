import React, { useContext } from 'react';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { AuthContext } from '../../../contexts/auth';

function Header() {
  const { signOut } = useContext(AuthContext);

  return (
    <Navbar color="secondary" expand="md" light>
      <div className="container d-flex justify-content-between w-100">
        <NavbarBrand className="text-white" href="/">
          Fake Store
        </NavbarBrand>
        <div>
          <Button color="light" outline onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
