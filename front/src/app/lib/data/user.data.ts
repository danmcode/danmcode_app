import { User } from "../domain/entities/user.entity";

export const UsersData = (): User[] => [
  new User({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456738",
    name: "Daniel Alexander",
    lastName: "Muelas Rivera",
    photoPath: "/images/user_danmcode.jpeg",
    email: "danmcode@gmail.com",
    puesto: "Danmcode INC",
    profile: "Administrador del sistema"
  }),
  new User({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456739",
    name: "Sharon",
    lastName: "Paniquita Rueda",
    photoPath: "/images/user_danmcode.jpeg",
    email: "spaniquita@gmail.com",
    puesto: "Danmcode INC",
    profile: "Administradora"
  }),
  new User({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456732",
    name: "Jhan Carlos",
    lastName: "Ortiz Zuleta",
    photoPath: "/images/user_danmcode.jpeg",
    email: "jortiz@gmail.com",
    puesto: "Danmcode INC",
    profile: "Jefe de seguridad"
  }),
];