import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";

interface ClientData {
    id: UUID;
    name: string;
    nit: string;
    address: string;
    email: string;
    phone: string;
    type: string;
}

export class Client {
    constructor(clientData: ClientData) {
        const { id, name, nit, address, email, phone, type } = clientData;
        this.id = id;
        this.name = name;
        this.nit = nit;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.type = type;
    }

    id: UUID;
    name: string;
    nit: string;
    address: string;
    email: string;
    phone: string;
    type: string;

    static headers() {
        return ['NOMBRE', 'NIT', 'DIRECCION', 'CORREO', 'TELEFONO', 'TIPO', 'ACCIONES'];
    }

    static actions() {
        return [{
            actionName: "Ver",
            icon: faEye,
            href: "#!",
        },
        {
            actionName: "Editar",
            icon: faPencil,
            href: "#!",
        },
        {
            actionName: "Eliminar",
            icon: faTrash,
            href: "#!",
        }];
    }
}