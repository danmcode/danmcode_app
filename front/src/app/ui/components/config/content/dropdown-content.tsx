"use client";

import React, { useState } from "react";
import ListItem from "./dropdown-item";
import BootstrapModal from "../../bootstrap-modal";
import ListForm from "./lists/list-form";

export default function DropDownContent() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // Estado para los elementos seleccionados
    const [currentList, setCurrentList] = useState<string | null>(null); // Estado para la lista actual seleccionada

    const handleClose = () => setShowModal(false);

    const handleEdit = (id: number) => {
        setModalTitle(`Editar nombre de lista: ${id}`);
        setModalContent(<ListForm />);
        setShowModal(true);
    };

    const handleAdd = () => {
        setModalTitle("Crear una nueva lista");
        setModalContent(<ListForm />);
        setShowModal(true);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item with id: ${id}`);
    };

    const handleClick = async (id: number) => {
        const listItem = items.find(item => item.id === id);
        if (listItem) {
            setCurrentList(listItem.text); // Establece la lista actual seleccionada
            const response = await fetchItemsForList(listItem.text as ListName);
            setSelectedItems(response);
        }
    };

    // Definición de los tipos de nombres de listas permitidos
    type ListName = 'Tipos de Identificación' | 'Tipos de Cliente' | 'Tipos de Contacto';

    // Simula una petición a una API
    const fetchItemsForList = async (listName: ListName) => {
        // Aquí puedes hacer una llamada a una API real o simular una respuesta
        // Para este ejemplo, vamos a simular la respuesta
        const simulatedResponses: Record<ListName, string[]> = {
            "Tipos de Identificación": ["Cédula", "Pasaporte", "Licencia de Conducir"],
            "Tipos de Cliente": ["Corporativo", "Individual", "Mixto"],
            "Tipos de Contacto": ["Email", "Teléfono", "Redes Sociales"]
        };

        return new Promise<string[]>(resolve => {
            setTimeout(() => {
                resolve(simulatedResponses[listName]);
            }, 1000); // Simula un retraso de 1 segundo
        });
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
                            <div className="row">
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
                        <h5 className="card-title">{currentList || "Elementos"}</h5>
                        <ul className="list-group list-group-flush">
                            {selectedItems.map((item, index) => (
                                <li key={index} className="list-group-item">{item}</li>
                            ))}
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
