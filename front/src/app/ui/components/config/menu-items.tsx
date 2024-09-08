import { faBuilding, faCheck, faListDots, faUsers, faUserShield } from "@fortawesome/free-solid-svg-icons";
import RolesContent from "./content/roles/roles-content";
import DropDownContent from "./content/lists/dropdown-content";

export const ConfigMenuItems = [
    {
        icon: faListDots,
        id: "dropDownListTab",
        target: "dropDownListTabContent",
        name: "Listas desplegables",
        content: <DropDownContent />
    },
    {
        icon: faUserShield,
        id: "RolesTab",
        target: "RolesTabContent",
        name: "Roles",
        content: <RolesContent />
    },
    {
        icon: faBuilding,
        id: "ClientsTab",
        target: "ClientsTabContent",
        name: "Clientes",
        content: <>Clientes</>
    },
    {
        icon: faUsers,
        id: "UsersTab",
        target: "userTabContent",
        name: "Usuarios",
        content: <>Usuarios</>
    },
    {
        icon: faCheck,
        id: "PermisosTab",
        target: "PermisosTabContent",
        name: "Permisos",
        content: <> Permisos </>
    },
]