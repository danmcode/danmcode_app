"use client"

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ListItemProps {
    id: string;
    text: string;
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onClick: (id: string) => void;
}

export default function ListItem({ id, text, onEdit, onDelete, onClick }: ListItemProps) {

    const [showButtons, setShowButtons] = useState(false);

    return (
        <li className='config-dropdown-item list-group-item'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            onClick={(e) => { e.stopPropagation(); onClick(id); }}
            id={id.toString()}
        >
            <span className='text-sm'>{text}</span>
            {showButtons && (
                <div>
                    <button className='btn btn-sm'
                        onClick={ (e) => { e.stopPropagation(); onEdit(id); } }
                    >
                        <FontAwesomeIcon className='text-primary'
                            icon={faPencilAlt}
                        ></FontAwesomeIcon>
                    </button>
                    <button className='btn btn-sm'
                        onClick={ (e) => { e.stopPropagation(); onDelete(id); } }
                    >
                        <FontAwesomeIcon className='text-danger'
                            icon={faTrashAlt}
                        ></FontAwesomeIcon>
                    </button>
                </div>
            )}
        </li>
    );
}