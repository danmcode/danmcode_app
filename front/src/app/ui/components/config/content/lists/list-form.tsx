import { Button, Col, Form, InputGroup, Row } from "react-bootstrap";
import FormIconInput from "../../../form-icon-input";
import { faListDots } from "@fortawesome/free-solid-svg-icons";

const ListForm = () => {
    return (
        <Form>
            <Row className="align-items-center">
                <Col sm="8" className="my-1">
                    <FormIconInput
                        label={"Nombre de la Lista *"}
                        placeHolder={"Nombre de la Lista *"}
                        icon={faListDots}
                        type="text"
                        id="name"
                    />
                </Col>

                <Col xs="4" className="my-1">
                    <Button type="submit">Guardar</Button>
                </Col>
            </Row>
        </Form>
    );
};

export default ListForm;