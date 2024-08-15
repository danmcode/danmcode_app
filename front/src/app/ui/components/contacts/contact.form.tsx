import { faArrowLeftLong, faBuilding, faEnvelope, faIdBadge, faLocation, faPhone, faSave, faUser } from "@fortawesome/free-solid-svg-icons";
import FormIconInput from "../form-icon-input";
import IconButton from "../icon-button";
import TextButton from "../text-button";
import ContactProfileCard from "./contact-profile-card";

export default function ContactForm() {
    return (

        <div className="mb-9">
            <div className="row g-6">
                <div className="col-12 col-xl-4">
                    <ContactProfileCard />
                </div>

                <div className="col-12 col-xl-8">
                    <div className="border-bottom mb-4">
                        <div className="mb-6">
                            <h4 className="mb-4"> Información del contacto </h4>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Nombres"}
                                        placeHolder={"Nombres"}
                                        icon={faUser}
                                        type="text"
                                        id="name"
                                    />
                                </div>
                                
                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Apellidos"}
                                        placeHolder={"Apellidos"}
                                        icon={faUser}
                                        type="text"
                                        id="name"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Tipo de identificación"}
                                        placeHolder={"Tipo de identificación"}
                                        icon={faIdBadge}
                                        type="number"
                                        id="lastName"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Identificación"}
                                        placeHolder={"Identificación"}
                                        icon={faIdBadge}
                                        type="number"
                                        id="lastName"
                                    />
                                </div>


                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Correo Electrónico"}
                                        placeHolder={"Correo Electrónico"}
                                        icon={faEnvelope}
                                        type="email"
                                        id="lastName"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Teléfono"}
                                        placeHolder={"Teléfono"}
                                        icon={faPhone}
                                        type="number"
                                        id="lastName"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Ubicación"}
                                        placeHolder={"Ubicación"}
                                        icon={faLocation}
                                        type="text"
                                        id="addreess"
                                    />
                                </div>
                                

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Unidad privada"}
                                        placeHolder={"Unidad privada"}
                                        icon={faBuilding}
                                        type="text"
                                        id="clientType"
                                    />
                                </div>

                            </div>
                        </div>

                        <div className="text-end mb-6">
                            <div>
                                <TextButton
                                    buttonHref={"/admin/contacts"}
                                    buttonName={"Regresar"}
                                    butonIcon={faArrowLeftLong}
                                />

                                <IconButton
                                    buttonHref={"/admin-module/users/create-user"}
                                    buttonName={"Crear contacto"}
                                    butonIcon={faSave}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="row gy-5">
                        <div className="col-12 col-md-6">
                            <h4 className="text-body-emphasis">Desactivar contacto</h4>
                            <p className="text-body-tertiary">
                                Desactivar el contacto del aplicativo
                            </p>
                            <button className="btn btn-warning">Desactivar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}