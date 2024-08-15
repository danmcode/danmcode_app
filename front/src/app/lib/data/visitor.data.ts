import { Visitor } from "../domain/entities/visitor";


export const VisitorData = (): Visitor[] => [
  new Visitor({
    id: "683ec100-ee5e-4f8c-aa95-b0269d456738",
    identificationType: "CC",
    identification: "1144097956",
    name: "Daniel Alexander Muelas Rivera",
    lastName: "Muelas Rivera",
    visitorType: "Visitante",
    phoneNumber: "3108903571",
    company: "Danmcode Inc",
    photoPath: "/images/user_danmcode.jpeg",
    observations: "Ninguna",
  }),

];