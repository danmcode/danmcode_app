"use client";

import React, { useEffect, useState } from "react";
import ListItem from "./dropdown-item";
import ListForm from "./list-form";
import BootstrapModal from "../../../bootstrap-modal";
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";
import LoadingLists from "@/app/ui/loading-lists";

export default function DropDownContent() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [selectedItems, setSelectedItems] = useState<string[]>([]); // Estado para los elementos seleccionados
    const [currentList, setCurrentList] = useState<string | null>(null); // Estado para la lista actual seleccionada

    const [dropDowns, setDropDowns] = useState<DropDownList[] | null>(null)
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowModal(false);

    const handleEdit = (dropDownList: DropDownList) => {
        setModalTitle(`Editar lista`);
        setModalContent(
            <ListForm dropDownList={dropDownList}/>
        );
        setShowModal(true);
    };

    const handleAdd = () => {
        setModalTitle("Crear una nueva lista");
        setModalContent(<ListForm />);
        setShowModal(true);
    };

    const handleDelete = (id: string) => {
        console.log(`Delete item with id: ${id}`);
    };

    const handleClick = async (id: string) => {
        // const listItem = items.find(item => item.id === id);
        // if (listItem) {
        //     setCurrentList(listItem.text); // Establece la lista actual seleccionada
        //     const response = await fetchItemsForList(listItem.text as ListName);
        //     setSelectedItems(response);
        // }
    };

    const renderContent = () => {
        if (loading) {
            return <LoadingLists />;
        }
        
        if (dropDowns?.length === 0) {
            return (
                <li className="list-group-item edit">
                    No hay listas registradas.
                </li>
            );
        }
    
        return dropDowns?.map(item => (
            <ListItem
                key={item.id}
                id={item.id}
                text={item.list_name}
                onEdit={() => handleEdit(item)}
                onClick={() => handleClick(item.id)}
                onDelete={() => handleDelete(item.id)}
            />
        ));
    }; 

    useEffect(() => {
        const fetchDropDown = async() => {
            try {
                const dropDown = await DropDownList.getAll();
                setDropDowns(dropDown);
            } catch (error) {
                console.error('Failed to fetch dropDowns', error);
            }finally {
                setLoading(false);
            }
        }

        fetchDropDown();
    }, []);

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
                            { renderContent() }
                        </ul>
                    </div>
                </div>
            </div>
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{currentList || "Elementos"}</h5>
                        <ul className="list-group list-group-flush">
                            <LoadingLists />
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
