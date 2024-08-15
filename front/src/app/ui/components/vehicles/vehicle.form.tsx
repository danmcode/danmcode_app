import { faArrowLeftLong, faBuilding, faCar, faCarSide, faCircle, faColonSign, faEnvelope, faFlag, faIdBadge, faLocation, faPhone, faSave, faTry, faUser } from "@fortawesome/free-solid-svg-icons";
import FormIconInput from "../form-icon-input";
import IconButton from "../icon-button";
import TextButton from "../text-button";
import VehicleProfileCard from "./vehicle-profile-card";

export default function VehicleForm() {

    return (

        <div className="mb-9">
            <div className="row g-6">
                <div className="col-12 col-xl-4">
                    <VehicleProfileCard />
                </div>

                <div className="col-12 col-xl-8">
                    <div className="border-bottom mb-4">
                        <div className="mb-6">
                            <h4 className="mb-4"> Información del vehículo </h4>
                            <div className="row g-3">
                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Marca"}
                                        placeHolder={"Marca"}
                                        icon={faCarSide}
                                        type="text"
                                        id="name"
                                    />
                                </div>
                                
                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Placa"}
                                        placeHolder={"Placa"}
                                        icon={faCar}
                                        type="text"
                                        id="name"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Linea"}
                                        placeHolder={"Linea"}
                                        icon={faFlag}
                                        type="text"
                                        id="lastName"
                                    />
                                </div>

                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Color"}
                                        placeHolder={"Color"}
                                        icon={faCircle}
                                        type="number"
                                        id="lastName"
                                    />
                                </div>


                                <div className="col-12 col-sm-6">
                                    <FormIconInput
                                        label={"Contacto"}
                                        placeHolder={"Contacto"}
                                        icon={faUser}
                                        type="text"
                                        id="lastName"
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