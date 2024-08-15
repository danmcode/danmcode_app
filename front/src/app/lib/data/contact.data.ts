import { Contact } from "../domain/entities/contact.entity";

export const ContactData = (): Contact[] => [
  new Contact({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456738",
    photoPath: "/images/user_danmcode.jpeg",
    name: "Daniel Alexander",
    lastName: "Muelas Rivera",
    identification_type: "C.C",
    identification: "1144097956",
    email: "danmcode@gmail.com",
    phone: "3108903571",
    client: "Conjunto residencial danmcode",
    location: "Primer Piso",
    privateUnit: "Apartamento 204",
    contactType: "Propietario",
    jobTitle: "",
  }),

];