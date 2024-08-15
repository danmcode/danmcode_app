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

export default function CreateUser() {
    const breadcrumbs = [
        {label: 'Inicio', href: '/admin'},
        {label: 'Usuarios', href: '/admin/users'},
        {label: 'Crear usuario', href: '/admin/users/create-user', active: true}
      ];
    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle=""/>
            <h2 className="text-bold text-body-emphasis mb-5">Usuarios</h2>
            
            <div className="mb-9">
                <div className="row g-6">
                    <div className="col-12 col-xl-4">
                        <UserProfileCard />

                        <div className="mb-4">
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    id="showPhone"
                                    type="checkbox"
                                    checked={false}
                                    name="showPhone"
                                />
                                <label className="form-check-label fs-8">
                                    Permitir a otros usuarios ver el número de teléfono
                                </label>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    id="permitFollow"
                                    type="checkbox"
                                    checked={false}
                                    name="permitFollow"
                                />
                                <label className="form-check-label fs-8">
                                    ¿Cuenta asociada a un Contacto?
                                </label>
                            </div>
                            <div className="form-check form-switch">
                                <input
                                    className="form-check-input"
                                    id="permitFollow"
                                    type="checkbox"
                                    checked={false}
                                    name="permitFollow"
                                />
                                <label className="form-check-label fs-8">
                                    Envíar notificaciones
                                </label>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-xl-8">
                        <div className="border-bottom mb-4">
                            <div className="mb-6">
                                <h4 className="mb-4"> Información personal </h4>
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
                                            id="lastName"
                                        />
                                    </div>

                                    <div className="col-12 col-sm-6">
                                        <FormIconInput
                                            label={"Identificación"}
                                            placeHolder={"Identificación"}
                                            icon={faIdBadge}
                                            type="number"
                                            id="identification"
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
                                            label={"Dirección"}
                                            placeHolder={"Dirección"}
                                            icon={faLocation}
                                            type="number"
                                            id="addreess"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row gx-3 mb-6 gy-6 gy-sm-3">
                                <div className="col-12 col-sm-6">
                                    <h4 className="mb-4"> Puesto asociado </h4>
                                    <FormIconInput
                                        label={"Nombre del puesto"}
                                        placeHolder={"Nombre del puesto"}
                                        icon={faBuilding}
                                        type="select"
                                        id="location"
                                        customClassName="mb-3"
                                    />
                                    <FormIconInput
                                        label={"Perfil"}
                                        placeHolder={"Perfil"}
                                        icon={faUser}
                                        type="text"
                                        id="profile"
                                    />
                                </div>
                                <div className="col-12 col-sm-6">
                                    <h4 className="mb-4">Cuenta de usuario</h4>

                                    <FormIconInput
                                        label={"Nombre de usuario"}
                                        placeHolder={"Nombre de usuario"}
                                        icon={faAt}
                                        type="text"
                                        id="profile"
                                        customClassName="mb-3"
                                    />
                                    <FormIconInput
                                        label={"Contraseña"}
                                        placeHolder={"Contraseña"}
                                        icon={faLock}
                                        type="password"
                                        id="password"
                                        customClassName="mb-3"
                                    />

                                    <FormIconInput
                                        label={"Confirmar Contraseña"}
                                        placeHolder={"Confirmar Contraseña"}
                                        icon={faLock}
                                        type="password"
                                        id="confirmPassword"
                                        customClassName="mb-3"
                                    />
                                </div>
                            </div>

                            <div className="text-end mb-6">
                                <div>
                                    <TextButton
                                        buttonHref={"/admin/users"}
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
                                <h4 className="text-body-emphasis">Desactivar cuenta</h4>
                                <p className="text-body-tertiary">
                                    Desactivar la cuenta del usuario, para no permitir futuros
                                    inicio de sesión
                                </p>
                                <button className="btn btn-warning">Desactivar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
