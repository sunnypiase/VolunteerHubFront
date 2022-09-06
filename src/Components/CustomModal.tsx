import React, { useEffect, useRef, useState } from "react";

interface ModalProps {
  children: React.ReactNode;
  isAutoModalHeight: boolean;
  title: string;
  h1CustomClass: string;
  onClose: () => void;
}

function CustomModal({ children, isAutoModalHeight, title, h1CustomClass, onClose }: ModalProps) {

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    if (isAutoModalHeight) {
      document.getElementById('modal-container')!.style.height = 'auto';
    }
    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [])

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div id="modal-container" onClick={(e) => { e.stopPropagation() }}>
          <h1 className={h1CustomClass}>{title}</h1>
          <div className="modal-container-content-scroll">
            {children}
          </div>
        </div>
      </div>
    </>
  );
}

export default CustomModal;
