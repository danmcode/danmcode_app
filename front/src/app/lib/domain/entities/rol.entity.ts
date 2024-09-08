import { faEye, faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";
import { UUID } from "crypto";
import { fetchResource } from "../../infraestructure/api.endpoints";


interface RolData {
    id: UUID;
    role_name: string;
    description: string;
    is_active: boolean;
}

export class Rol {

    id: UUID;
    role_name: string;
    description: string;
    is_active: boolean;

    constructor(clientData: RolData) {
        const { id, role_name, description, is_active } = clientData;
        this.id = id;
        this.role_name = role_name;
        this.description = description;
        this.is_active = is_active;
    }

    static async getAll() {
        const data = await fetchResource('roles');

        return data['roles'].map((roleData: any) => new Rol({
            id: roleData.id,
            role_name: roleData.role_name,
            description: roleData.description,
            is_active: roleData.is_active
        }));

    }


    static headers() {
        return ['ROL', 'DESCRIPCIÓN', 'ESTADO', 'ACCIONES'];
    }

    static actions() {
        return [{
            actionName: "Editar",
            icon: faPencil,
            href: "#!",
        }]
    }
}

