import React, { useCallback, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from 'reactstrap';
import api from '../../../config/api';
import { ToastContext } from '../../../contexts/toast';
import { Product } from '../../../entities/product';

type Props = {
  product: Product;
};

function CartItem({ product }: Props) {
  const navigate = useNavigate();
  const { showToast } = useContext(ToastContext);
  const [isRemoveModalOpen, setIsRemoveModalOpen] = useState(false);

  const handleOpenRemoveModal = useCallback(() => {
    setIsRemoveModalOpen(true);
  }, []);

  const handleRemoveItemFromCart = useCallback(async () => {
    try {
      await api.delete(`products/${product.id}`);

      showToast({
        title: 'Success!',
        body: 'Product removed successfully.',
      });

      navigate(-1);
    } catch (err) {
      console.error(err);
    }
  }, [navigate, product.id, showToast]);

  return (
    <>
      <tr>
        <th style={{ width: 56 }}>
          <img
            src={product.image}
            alt={product.title}
            style={{ maxWidth: 56 }}
          />
        </th>
        <th>
          {product.quantity}x {product.title}
        </th>
        <th>$ {(product.quantity || 1) * product.price}</th>
        <th>
          <Button color="danger" onClick={handleOpenRemoveModal}>
            X
          </Button>
        </th>
      </tr>
      <Modal
        isOpen={isRemoveModalOpen}
        toggle={() => setIsRemoveModalOpen(!isRemoveModalOpen)}
      >
        <ModalHeader
          close={
            <Button
              className="close"
              outline
              onClick={() => setIsRemoveModalOpen(false)}
            >
              ×
            </Button>
          }
          toggle={() => setIsRemoveModalOpen(!isRemoveModalOpen)}
        >
          Confimation
        </ModalHeader>
        <ModalBody>You sure want to remove this product from cart?</ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={handleRemoveItemFromCart}>
            Remove
          </Button>{' '}
          <Button onClick={() => setIsRemoveModalOpen(false)}>Cancel</Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default CartItem;
