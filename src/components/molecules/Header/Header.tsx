import React, { useCallback, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar, NavbarBrand, Button } from 'reactstrap';
import { AuthContext } from '../../../contexts/auth';
import { CartContext } from '../../../contexts/cart';

function Header() {
  const { signOut } = useContext(AuthContext);
  const { cartProductsCount, userCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleClickCart = useCallback(() => {
    navigate(`cart/${userCart?.id}`);
  }, [navigate, userCart?.id]);

  return (
    <Navbar color="secondary" expand="md" light>
      <div className="container d-flex justify-content-between w-100">
        <NavbarBrand className="text-white" href="/">
          Fake Store
        </NavbarBrand>
        <div>
          <Button color="info" className="me-2" onClick={handleClickCart}>
            {`Cart ${cartProductsCount ? `(${cartProductsCount})` : ''}`}
          </Button>
          <Button color="light" outline onClick={signOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </Navbar>
  );
}

export default Header;
