'use client';

import { Button, Col, Form, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DropDownListItem } from '../../../../../lib/domain/entities/dropdown-list-item.entity';
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";

const dropDownListSchema = z.object({
  list_name: z.string().min(1, "El nombre de la lista es obligatorio"),
});

type DropDownListFormData = z.infer<typeof dropDownListSchema>;

interface ListFormProps {
  dropDownList?: DropDownList;
  dropDownListItem?: DropDownListItem;
  isEdit?: boolean;
  isSearch?: boolean;
}

const ListItemForm: React.FC<ListFormProps> = ({ dropDownList = null, dropDownListItem = null ,isEdit = false, isSearch = false }) => {
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
            label={"Nombre del elemento de la lista *"}
            placeHolder={"Nombre del elemento de la lista *"}
            icon={faListDots}
            type="text"
            id="list_name"
            register={register("list_name")}
          />
          {errors.list_name && (
            <span className="text-danger">
              {errors.list_name.message}
            </span>
          )}
        </Col>

        <Col sm="8" className="my-1">
          <FormIconInput
            label={"Descripción *"}
            placeHolder={"Descripción *"}
            icon={faListDots}
            type="text"
            id="list_name"
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

export default ListItemForm;