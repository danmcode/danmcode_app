import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";
import { Contact } from "./contact.entity";

interface InOutContactsData {
    id: UUID;
    contact: Contact;
    dateIn: Date;
    dateOut: Date | null;
    observations: string;
}

export class InOutContacts {
    constructor(inOutContactData: InOutContactsData) {
        const { id, contact, dateIn, dateOut, observations } = inOutContactData;
        this.id = id;
        this.contact = contact;
        this.dateIn = dateIn;
        this.dateOut = dateOut;
        this.observations = observations

    }

    id: UUID;
    contact: Contact;
    dateIn: Date;
    dateOut: Date | null;
    observations: string;
    
    static headers() {
        return ['Contacto', 'INFORMACIÓN', 'HORA DE INGRESO', 'HORA DE SALIDA', 'ACCIONES'];
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