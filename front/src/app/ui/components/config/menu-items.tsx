import { faCheck, faListDots, faUserShield } from "@fortawesome/free-solid-svg-icons";
import DropDownContent from "./content/dropdown-content";
import RolesContent from "./content/roles-content";

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
        icon: faCheck,
        id: "PermisosTab",
        target: "PermisosTabContent",
        name: "Permisos",
        content: <RolesContent />
    },
]