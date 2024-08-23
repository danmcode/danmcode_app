// components/BootstrapModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface BootstrapModalProps {
    title: string;
    content: React.ReactNode;
    onClose: () => void;
}

const BootstrapModal: React.FC<BootstrapModalProps> = ({ title, content, onClose }) => {
    return (
        <Modal show={true} onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {content}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>
                    Cerrar
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default BootstrapModal;
