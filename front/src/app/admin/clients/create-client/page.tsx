import {
    faArrowLeftLong,
    faAt,
    faBuilding,
    faEnvelope,
    faIdBadge,
    faLocation,
    faLock,
    faPhone,
    faSave,
    faUser,
} from "@fortawesome/free-solid-svg-icons";

import UserProfileCard from "@/app/ui/components/users/user-profile-card";
import TextButton from "@/app/ui/components/text-button";
import IconButton from "@/app/ui/components/icon-button";
import FormIconInput from "@/app/ui/components/form-icon-input";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import ClientProfileCard from "@/app/ui/components/clients/client-profile-card";


export default function CreateClientPage() {

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Clientes', href: '/admin/clients'},
        { label: 'Crear cliente', href: '/admin/clients/create-client', active: true }
    ];
    return (
        <div>

            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle=""/>
            <h2 className="text-bold text-body-emphasis mb-5"> Crear Cliente </h2>

            <div className="mb-9">
                <div className="row g-6">
                    <div className="col-12 col-xl-4">
                        <ClientProfileCard />
                    </div>

                    <div className="col-12 col-xl-8">
                        <div className="border-bottom mb-4">
                            <div className="mb-6">
                                <h4 className="mb-4"> Información del cliente </h4>
                                <div className="row g-3">
                                    <div className="col-12 col-sm-6">
                                        <FormIconInput
                                            label={"Nombre del cliente"}
                                            placeHolder={"Nombre del cliente"}
                                            icon={faUser}
                                            type="text"
                                            id="name"
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <FormIconInput
                                            label={"Nit"}
                                            placeHolder={"Nit"}
                                            icon={faUser}
                                            type="text"
                                            id="lastName"
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <FormIconInput
                                            label={"Dirección"}
                                            placeHolder={"Dirección"}
                                            icon={faLocation}
                                            type="text"
                                            id="addreess"
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
                                            label={"Tipo de cliente"}
                                            placeHolder={"Tipo de cliente"}
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
                                        buttonHref={"/admin/clients"}
                                        buttonName={"Regresar"}
                                        butonIcon={faArrowLeftLong}
                                    />

                                    <IconButton
                                        buttonHref={"/admin-module/users/create-user"}
                                        buttonName={"Crear usuario"}
                                        butonIcon={faSave}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="row gy-5">
                            <div className="col-12 col-md-6">
                                <h4 className="text-body-emphasis">Desactivar cliente</h4>
                                <p className="text-body-tertiary">
                                    Desactivar el cliente del aplicativo
                                </p>
                                <button className="btn btn-warning">Desactivar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}