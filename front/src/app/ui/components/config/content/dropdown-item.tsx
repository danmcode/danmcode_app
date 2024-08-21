"use client"

import { faPencilAlt, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface ListItemProps {
    id: number;
    text: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onClick: (id: number) => void;
}

export default function ListItem({ id, text, onEdit, onDelete, onClick }: ListItemProps) {

    const [showButtons, setShowButtons] = useState(false);

    return (
        <li className='config-dropdown-item list-group-item'
            onMouseEnter={() => setShowButtons(true)}
            onMouseLeave={() => setShowButtons(false)}
            onClick={() => onClick(id)}
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