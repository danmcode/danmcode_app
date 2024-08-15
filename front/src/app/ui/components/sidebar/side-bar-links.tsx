import { faAddressBook, faArchive, faBook, faBuilding, faCar, faMessage, faTasks, faUsers} from "@fortawesome/free-solid-svg-icons";

export const SideBarLinks = [
    {
        groupMenu: {
            groupName: "Administración",
            keyValue: "group-admin",
            menus: [
                {
                    menuIcon: faAddressBook,
                    menuName: "Contactos",
                    menuHref: "nv-contacts",
                    keyValue: "nv-contacts",
                    subMenus: [
                        { name: "Ver contactos", href: "/admin/contacts", keyValue:"sb-show-contacts" },
                        { name: "Ingresos y salidas", href: "/admin/contacts/in-out-contacts", keyValue:"sb-in-out-contacts" },
                    ],
                },
                {
                    menuIcon: faCar,
                    menuName: "Vehículos",
                    menuHref: "nv-vehicles",
                    keyValue: "nv-vehicles",
                    subMenus: [
                        { name: "Ver vehiculos", href: "/admin/vehicles", keyValue:"show-vehicles" }
                    ],
                },
                {
                    menuIcon: faUsers,
                    menuName: "Visitantes",
                    menuHref: "nv-visitors",
                    keyValue: "nv-visitors",
                    subMenus: [
                        { name: "Ver visitantes", href: "/admin/visitors", keyValue:"show-visitors" },
                        { name: "Ingresos y salidas", href: "/admin/visitors/in-out-visitors", keyValue:"in-out-visitors" }
                    ],
                },
                {
                    menuIcon: faMessage,
                    menuName: "Mensajes",
                    menuHref: "nv-message",
                    keyValue: "nv-message",
                    subMenus: [
                        { name: "Ver mensajes", href: "/admin/messages", keyValue:"show-messages" }
                    ],
                },
                {
                    menuIcon: faArchive,
                    menuName: "Correspondencias",
                    menuHref: "nv-correspondences",
                    keyValue: "nv-correspondences",
                    subMenus: [
                        { name: "Ver correspondencias", href: "/admin/correspondences", keyValue:"show-correspondences" }
                    ],
                },
                {
                    menuIcon: faBook,
                    menuName: "Minutas",
                    menuHref: "nv-book-records",
                    keyValue: "nv-book-records",
                    subMenus: [
                        { name: "Ver Minutas", href: "/admin/book-records", keyValue:"show-correspondences" }
                    ],
                },
                {
                    menuIcon: faTasks,
                    menuName: "Tareas",
                    menuHref: "nv-tasks",
                    keyValue: "nv-tasks",
                    subMenus: [
                        { name: "Ver tareas", href: "/admin/tasks", keyValue:"show-tasks" }
                    ],
                },
            ],
        },
    },
    {
        groupMenu: {
          groupName: "Configuración",
          keyValue: "group-config",
          menus: [
            {
              menuIcon: faAddressBook,
              menuName: "Configuración general",
              menuHref: "nv-config",
              keyValue: "nv-config",
              subMenus: [{ name: "Configuración de clientes", href: "#", keyValue:"show-config" }],
            },
          ],
        },
      },
];
