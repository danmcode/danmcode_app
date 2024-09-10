'use client';

import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots } from "@fortawesome/free-solid-svg-icons";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { DropDownListItem } from '../../../../../lib/domain/entities/dropdown-list-item.entity';
import { DropDownList } from "@/app/lib/domain/entities/dropdown-list.entity";

const dropDownListSchema = z.object({
  list_item_name: z.string().min(1, "El nombre de la lista es obligatorio"),
  description: z.string().min(1, "La descripción de la lista es obligatoria"),
  list_id: z.string().min(1, "La descripción de la lista es obligatoria"),
});

type DropDownListFormData = z.infer<typeof dropDownListSchema>;

interface ListFormProps {
  dropDownList: DropDownList;
  dropDownListItem?: DropDownListItem;
  isEdit?: boolean;
  isSearch?: boolean;
  onSuccess: () => void;
  onCancel: () => void;
}

const ListItemForm: React.FC<ListFormProps> = ({ 
  dropDownList = null,
  dropDownListItem = null,
  isEdit = false, 
  isSearch = false,
  onSuccess,
  onCancel
}) => {
  const initialName = dropDownList ? dropDownListItem?.list_item_name : '';
  const initialDescription = dropDownList ? dropDownListItem?.description : '';

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },

  } = useForm<DropDownListFormData>({
    resolver: zodResolver(dropDownListSchema),
    defaultValues: {
      list_item_name: initialName,
      description: initialDescription,
      list_id: dropDownList?.id
    },
  });
  
  const onSubmit = async (data: DropDownListFormData) => {
    try {
      
      if(isEdit){
        const response = await DropDownList.edit(data);
        onSuccess();
      }

      if(isSearch) {
        await DropDownList.search(data);
        onSuccess();
      }

      await DropDownListItem.create(data);
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
      <input
        hidden
        value={dropDownListItem?.id} 
        {...register('list_id')}
      ></input>

      <Row className="align-items-center">
        <Col sm="6" className="my-1">
          <FormIconInput
            label={"Nombre *"}
            placeHolder={"Nombre *"}
            icon={faListDots}
            type="text"
            id="list_name"
            register={register("list_item_name")}
          />
          {errors.list_item_name && (
            <span className="text-danger">
              {errors.list_item_name.message}
            </span>
          )}
        </Col>

        <Col sm="6" className="my-1">
          <FormIconInput
            label={"Descripción *"}
            placeHolder={"Descripción *"}
            icon={faListDots}
            type="text"
            id="description"
            register={register("description")}
          />
          {errors.description && (
            <span className="text-danger">
              {errors.description.message}
            </span>
          )}
        </Col>


        <Modal.Footer className="mt-4">

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

export default ListItemForm;