'use client';

import { Button, Col, Form, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";

// Esquema de validación con Zod
const dropDownListSchema = z.object({
  list_name: z.string().min(1, "El nombre de la lista es obligatorio"),
});

// Interfaz para los datos del formulario
type DropDownListFormData = z.infer<typeof dropDownListSchema>;

interface DropDownList {
  id: string;
  list_name: string;
}

interface ListFormProps {
  dropDownList?: DropDownList;
  isEdit?: boolean;
  isSearch?: boolean;
}

const ListForm: React.FC<ListFormProps> = ({ dropDownList = null, isEdit = false, isSearch = false }) => {
  const initialName = dropDownList ? dropDownList.list_name : '';

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DropDownListFormData>({
    resolver: zodResolver(dropDownListSchema),
    defaultValues: {
      list_name: initialName,
    },
  });

  const onSubmit = (data: DropDownListFormData) => {
    console.log("Form data:", data);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-center">
        <Col sm="8" className="my-1">
          <FormIconInput
            label={"Nombre de la Lista *"}
            placeHolder={"Nombre de la Lista *"}
            icon={faListDots}
            type="text"
            id="list_name"
            // Se elimina el value porque React Hook Form maneja el control
            register={register("list_name")}
          />
          {errors.list_name && (
            <span className="text-danger">
              {errors.list_name.message}
            </span>
          )}
        </Col>

        <Col xs="4" className="my-1">
          <Button type="submit" disabled={isSearch}>
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default ListForm;