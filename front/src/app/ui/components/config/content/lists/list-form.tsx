'use client';

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";

// Esquema de validación con Zod
const dropDownListSchema = z.object({
  list_name: z.string().min(1, "El nombre de la lista es obligatorio"),
});

type DropDownListFormData = z.infer<typeof dropDownListSchema>;

interface ListFormProps {
  dropDownList?: DropDownList;
  isEdit?: boolean;
  isSearch?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}
const ListForm: React.FC<ListFormProps> = ({
  dropDownList = null,
  isEdit = false,
  isSearch = false,
  onSuccess,
  onCancel
}) => {
  const initialName = dropDownList ? dropDownList.list_name : '';

  const { register, handleSubmit, setError, formState: { errors } } = useForm<DropDownListFormData>({
    resolver: zodResolver(dropDownListSchema),
    defaultValues: { 
      list_name: initialName,
      ...(isEdit && { list_name_id: dropDownList?.id })
    },
  });

  const onSubmit = async (data: DropDownListFormData) => {
    try {
      
      if(isEdit){
        console.log(dropDownList?.id);
        await DropDownList.edit(data);
        onSuccess();
      }

      if(isSearch) {

        await DropDownList.search(data);
        onSuccess();
      }

      await DropDownList.create(data);
      onSuccess();

    } catch (error: any) {
      if (error.errors) {
        error.errors.forEach((err: any) => {
          setError(err.path, { type: "server", message: err.msg });
        });
      }else{
        console.log('error**:', error)
      }
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row className="align-items-center">
        <Col className="my-1 mb-2">
          <FormIconInput
            label={"Nombre de la Lista *"}
            placeHolder={"Nombre de la Lista *"}
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

        <Modal.Footer>
          <Button className="btn-secondary" onClick={onCancel}>
            {"Cancelar"}
          </Button>
          <Button type="submit" disabled={isSearch}>
            {isEdit ? "Actualizar" : "Guardar"}
          </Button>
        </Modal.Footer>
      </Row>
    </Form>
  );
};


export default ListForm;