import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";

interface UserData {
    id: UUID;
    name: string;
    lastName: string;
    photoPath: string;
    email: string;
    puesto: string;
    profile: string;
}

export class User {
    constructor(userData: UserData) {
        const { id, name, lastName, photoPath, email, puesto, profile } = userData;
        this.id = id;
        this.name = name;
        this.lastName = lastName;
        this.photoPath = photoPath;
        this.email = email;
        this.puesto = puesto;
        this.profile = profile;
    }

    id: UUID;
    name: string;
    lastName: string;
    photoPath: string;
    email: string;
    puesto: string;
    profile: string;

    static headers() {
        return ['USUARIO', 'CORREO', 'TELÉFONO', 'PUESTO', 'PERFIL', 'ACCIONES'];
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