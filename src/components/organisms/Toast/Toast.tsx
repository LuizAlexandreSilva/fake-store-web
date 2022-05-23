import React from 'react';
import { Toast as ReactToast, ToastHeader, ToastBody } from 'reactstrap';

export type ToastProps = {
  title: string;
  children: React.ReactNode;
  isOpen?: boolean;
};

function Toast({ title, isOpen, children }: ToastProps) {
  return (
    <ReactToast
      className="position-fixed"
      style={{ top: 0, right: 0, zIndex: 1000 }}
      isOpen={isOpen}
    >
      <ToastHeader>{title}</ToastHeader>
      <ToastBody className="bg-white">{children}</ToastBody>
    </ReactToast>
  );
}

export default Toast;
