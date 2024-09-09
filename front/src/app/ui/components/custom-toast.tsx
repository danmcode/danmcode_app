'use client';

import React, { useState } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const CustomToast: React.FC<{ message: string | null; onClose: () => void }> = ({ message, onClose }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast onClose={onClose} show={!!message} delay={5000} autohide>
        <Toast.Body>{message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default CustomToast;