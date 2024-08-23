"use client";

import ListItem from "./dropdown-item";

export default function DropDownContent() {

    const items = [
        { id: 1, text: 'Tipos de Identificación' },
        { id: 2, text: 'Tipos de Cliente' },
        { id: 3, text: 'Tipos de Contacto' },
    ];

    const handleEdit = (id: number) => {
        console.log(`Edit item with id: ${id}`);
    };

    const handleDelete = (id: number) => {
        console.log(`Delete item with id: ${id}`);
    };

    const handleClick = (id: number) => {
        console.log(`Clicked on item with id: ${id}`);
    };

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
                                    <button className="btn btn-sm btn-primary">
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
                                    onEdit={handleEdit}
                                    onClick={handleClick}
                                    onDelete={handleDelete}
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

                        </ul>
                    </div>
                </div>
            </div>
        </div>

    );

}