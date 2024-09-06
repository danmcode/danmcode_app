"use client";

import React, { useEffect, useState } from "react";
import ListItem from "./dropdown-item";
import ListForm from "./list-form";
import BootstrapModal from "../../../bootstrap-modal";
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";
import LoadingLists from "@/app/ui/loading-lists";
import { DropDownListItem } from "@/app/lib/domain/entities/dropdown-list-item.entity";
import ListItemForm from "./list-item-form";

export default function DropDownContent() {
    const [showModal, setShowModal] = useState(false);
    const [modalTitle, setModalTitle] = useState<string>("");
    const [modalContent, setModalContent] = useState<React.ReactNode>(null);
    const [selectedItems, setSelectedItems] = useState<DropDownListItem[]>([]);
    const [currentList, setCurrentList] = useState<DropDownList | null>(null);

    const [dropDowns, setDropDowns] = useState<DropDownList[] | null>(null)
    const [loading, setLoading] = useState(true);

    const handleClose = () => setShowModal(false);

    const handleEdit = (dropDownList: DropDownList) => {
        setModalTitle(`Editar lista`);
        setModalContent(
            <ListForm dropDownList={dropDownList} />
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
        const listItem = dropDowns!.find(item => item.id === id);
        if (listItem) {
            const response = listItem['dropdown_list_items'];
            const items = response?.map((itemData: any) => new DropDownListItem(itemData));
            setCurrentList(listItem);
            setSelectedItems(items ?? []);
        }
    };

    const handleAddItem = () => {
        setModalTitle(`Agrear ${currentList?.list_name}`);
        setModalContent(<ListItemForm />);
        setShowModal(true);
    };
 
    const handleEditItem = (dropDownListItem: DropDownListItem) => {
        setModalTitle(`Editar item de lista`);
        setModalContent( <ListItemForm dropDownListItem={dropDownListItem} /> );
        setShowModal(true);    
    };

    const handleDeleteItem = (id: string) => {
        console.log(`Delete item with id: ${id}`);
    };

    const renderDropDownContent = () => {
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

    const renderDropDownItemContent = () => {
        if (loading) {
            return <LoadingLists />;
        }

        if (selectedItems.length === 0) {
            return (
                <li className="list-group-item edit">
                    No hay listas registradas.
                </li>
            );
        }

        return selectedItems?.map(item => (
            <ListItem
                key={item.id}
                id={item.id}
                text={item.list_item_name}
                onEdit={() => handleEditItem(item)}
                onClick={() => ''}
                onDelete={() => handleDelete(item.id)}
            />
        ));
    }

    useEffect(() => {
        const fetchDropDown = async () => {
            try {
                const dropDown = await DropDownList.getAll();
                console.log(dropDown);
                setDropDowns(dropDown);
            } catch (error) {
                console.error('Failed to fetch dropDowns', error);
            } finally {
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
                            {renderDropDownContent()}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body">

                        <div className="card-title">
                            <div className="row">
                                <div className="col-10 align-self-center">
                                    <h5 className="card-title">{currentList?.list_name || "Elementos"}</h5>
                                </div>
                                <div className="d-flex justify-content-end col-2">
                                    <button
                                        className="btn btn-sm btn-primary"
                                        onClick={handleAddItem}
                                    >
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <ul className="list-group list-group-flush">
                            {renderDropDownItemContent()}
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
