import { Client } from "../domain/entities/client.entity";

export const ClientsData = (): Client[] => [
  new Client({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456738",
    name: "Danmcode inc",
    nit: "6028903571",
    address: "Carrera 24 C oeste #4-114",
    email: "admin@danmcode.com",
    phone: "6028903571",
    type: "Empresa",
  }),
  new Client({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456739",
    name: "Conjunto Residencial Danmcode",
    nit: "6028903571",
    address: "Carrera 24 C oeste #4-114",
    email: "admin@danmcode.com",
    phone: "6028903571",
    type: "Conjunto Residencial",
  }),
  new Client({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456740",
    name: "Hospital Corazón",
    nit: "6028903571",
    address: "Carrera 24 C oeste #4-114",
    email: "admin@danmcode.com",
    phone: "6028903571",
    type: "Hospital",
  }),
];