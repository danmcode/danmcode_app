import { Contact } from "../domain/entities/contact.entity";
import { Vehicle } from "../domain/entities/vehicle.entity";

export const VehicleData = (): Vehicle[] => [
    new Vehicle({
        id: "683ec100-ee5e-4f8c-aa95-b0269d456745",
        brand: "Suzuki",
        line: "Gixxer 150",
        vehicleType: "Motocicleta",
        licensePlate: "RXR36G",
        color: "Negro",
        photoPath: "https://i.pinimg.com/564x/79/d5/ff/79d5ff7267dff55042619fbadd067ce0.jpg",
        contact: new Contact({
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

    }),
]