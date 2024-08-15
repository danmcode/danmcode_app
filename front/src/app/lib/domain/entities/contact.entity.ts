import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";

interface ContactData {
    id: UUID;
    photoPath: string;
    name: string;
    lastName: string;
    identification_type: string;
    identification: string;
    email: string;
    phone: string;
    client: string;
    location: string;
    privateUnit: string;
    contactType: string;
    jobTitle: string;
}

export class Contact {
    constructor(clientData: ContactData) {
        const {
            id,
            name,
            photoPath,
            lastName,
            identification_type,
            identification,
            email,
            phone,
            client,
            location,
            privateUnit,
            contactType,
            jobTitle,
        } = clientData;
        this.id = id;
        this.photoPath = photoPath;
        this.name = name;
        this.lastName  = lastName;
        this.identification_type = identification_type;
        this.identification = identification;
        this.email = email;
        this.phone = phone;
        this.client = client;
        this.location = location;
        this.privateUnit = privateUnit;
        this.contactType = contactType;
        this.jobTitle = jobTitle;
    }

    id: UUID;
    photoPath: string;
    name: string;
    lastName: string;
    identification_type: string;
    identification: string;
    email: string;
    phone: string;
    client: string;
    location: string;
    privateUnit: string;
    contactType: string;
    jobTitle: string;

    static headers() {
        return ['NOMBRE', 'IDENTIFICACIÓN', 'CORREO', 'TELEFONO', 'CLIENTE' ,'UBICACIÓN', 'UNIDAD PRIVADA','ACCIONES'];
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