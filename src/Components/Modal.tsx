import { Card, CardContent, Typography } from '@mui/material';
import React from 'react';

interface ModalProps {
  children: React.ReactNode;
  title: string;
  onClose: () => void;
}

function Modal({ children, title, onClose }: ModalProps) {
  return (
    <>
      <div
        className="fixed bg-black/50 top-0 right-0 left-0 bottom-0"
        onClick={onClose}
      ></div>
      <div className="w-[60em] rounded bg-design fixed top-10 left-1/2 -translate-x-1/2">
        <h1 className="modal-title">{title}</h1>
        {children}
      </div>
    </>
  );
}

export default Modal;
