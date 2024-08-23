"use client";

import React, { useState } from "react";
import ListItem from "./dropdown-item";
import BootstrapModal from "../../bootstrap-modal";

export default function DropDownContent() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);

    const handleClose = () => setShowModal(false);

    const handleEdit = (id: number) => {
        setModalTitle(`Editar nombre de lista: ${id}`);
        setModalContent(`Editar nombre de lista: ${id}`);
        setShowModal(true);
    };

    const handleAdd = () => {
        setModalTitle("Crear una nueva lista");
        setModalContent("Add new item content goes here.");
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item with id: ${id}`);
    };

    const handleClick = (id: number) => {
        console.log(`Clicked on item with id: ${id}`);
    };

    const items = [
        { id: 1, text: 'Tipos de Identificación' },
        { id: 2, text: 'Tipos de Cliente' },
        { id: 3, text: 'Tipos de Contacto' },
    ];

    return (
        <div className="row g-3">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className="row ">
                                <div className="col-10 align-self-center">
                                    <h5>Listas</h5>
                                </div>
                                <div className="d-flex justify-content-end col-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={handleAdd}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <ul className="list-group list-group-flush">
                            {items.map(item => (
                                <ListItem
                                    key={item.id}
                                    id={item.id}
                                    text={item.text}
                                    onEdit={() => handleEdit(item.id)}
                                    onClick={() => handleClick(item.id)}
                                    onDelete={() => handleDelete(item.id)}
                                />
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Elementos</h5>
                        <ul className="list-group list-group-flush">
                            {/* Aquí puedes agregar más lógica para los elementos */}
                        </ul>
                    </div>
                </div>
            </div>

            {showModal && (
                <BootstrapModal
                    title={modalTitle}
                    content={modalContent}
                    onClose={handleClose}
                />
            )}
        </div>
    );
}
