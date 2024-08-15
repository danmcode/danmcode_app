import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";
import { Contact } from "./contact.entity";

interface VehicleData {
    id: UUID;
    brand: string;
    line: string;
    vehicleType: string;
    licensePlate: string;
    color: string;
    photoPath: string;
    contact: Contact;
}

export class Vehicle {
    constructor(userData: VehicleData) {
        const { id, brand, line, vehicleType, licensePlate, color, photoPath, contact} = userData;
        this.id = id;
        this.brand = brand;
        this.line = line;
        this.vehicleType = vehicleType;
        this.licensePlate = licensePlate;
        this.color = color;
        this.photoPath = photoPath;
        this.contact = contact;
    }

    id: UUID;
    brand: string;
    line: string;
    vehicleType: string;
    licensePlate: string;
    color: string;
    photoPath: string;
    contact: Contact;


    static headers() {
        return ['MARCA', 'TIPO VEHÍCULO', 'PLACA', 'COLOR', 'CONTACTO', 'ACCIONES'];
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