'use client';

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots, faTrash } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ClientPageRoot } from "next/dist/client/components/client-page";


interface DeleteListProps {
    dropDownList?: DropDownList;
    onSuccess: () => void;
    onCancel: () => void;
}

const DeleteList: React.FC<DeleteListProps> = ({
    dropDownList = null,
    onSuccess,
    onCancel,
}) => {

    const handleDelete = async () => {
        const data = { 'list_name_id': dropDownList?.id }
        const deleted = await DropDownList.delete(data);
        return onSuccess();
    }

    const handleCancel = async () => {
        return onCancel();
    }

    return (
        <Row className="align-items-center">
            <Col className="my-1 mb-2">
                <span>
                    {`¿Desea eliminar la lista: ${dropDownList?.list_name} ? `}
                </span>
            </Col>

            <Modal.Footer>
                <Button className="btn-secondary" onClick={handleCancel}>
                    {"Cancelar"}
                </Button>
                <Button className="btn-danger" onClick={handleDelete}>
                    <FontAwesomeIcon icon={faTrash} /> {"Eliminar"}
                </Button>
            </Modal.Footer>

        </Row>
    );
};

export default DeleteList;