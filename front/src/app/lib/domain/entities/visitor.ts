import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";

interface VisitorData {
    id: UUID;
    identificationType: string;
    identification: string;
    name: string;
    lastName: string;
    visitorType: string;
    phoneNumber: string;
    company: string;
    photoPath: string;
    observations: string;
}

export class Visitor {
    constructor(userData: VisitorData) {
        const {
            id,
            identificationType,
            identification,
            name,
            lastName,
            visitorType,
            phoneNumber,
            company,
            photoPath,
            observations, } = userData;

        this.id = id;
        this.identificationType = identificationType;
        this.identification = identification;
        this.name = name;
        this.lastName = lastName;
        this.visitorType = visitorType;
        this.phoneNumber = phoneNumber;
        this.company = company;
        this.photoPath = photoPath;
        this.observations = observations;
    }

    id: UUID;
    identificationType: string;
    identification: string;
    name: string;
    lastName: string;
    visitorType: string;
    phoneNumber: string;
    company: string;
    photoPath: string;
    observations: string;


    static headers() {
        return ['VISITANTE', 'IDENTIFICACIÓN', 'TELÉFONO', 'TIPO DE VISITANTE', 'EMPRESA', 'ACCIONES'];
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