import Image from "next/image";
import {
    faBuilding,
    faBuildingShield,
    faEnvelope,
    faIdBadge,
    faLocation,
    faPhone,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import ClientProfileItemCard from "@/app/ui/components/clients/client-profile-item";


export default function ClientProfileCard() {
    return (
        <div className="card mb-5">
            <div className="card-header hover-actions-trigger position-relative mb-6">
                <div className="bg-holder rounded-top">
                    <input
                        className="d-none"
                        id="upload-settings-cover-image"
                        type="file"
                    />
                    <label className="cover-image-file-input"></label>
                    <div className="hover-actions end-0 bottom-0 pe-1 pb-2 text-white dark__text-gray-1100">
                        <span className="fa-solid fa-camera me-2"></span>
                    </div>
                </div>

                <input
                    className="d-none"
                    id="upload-settings-porfile-picture"
                    type="file"
                />

                <label className="avatar avatar-4xl status-online feed-avatar-profile cursor-pointer">
                    <Image
                        className="rounded-circle img-thumbnail shadow-sm border-0"
                        src="/icons/fa-building.svg"
                        width="15"
                        height={15}
                        alt=""
                    />
                </label>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-wrap mb-2 align-items-center">
                            <h3 className="me-2"> Danmcode Inc </h3>
                        </div>
                        <div className="d-flex d-xl-block d-xxl-flex align-items-center">
                            <ClientProfileItemCard
                                icon={faBuildingShield}
                                textInfo={"6028903571"}
                            />
                            <ClientProfileItemCard
                                icon={faLocation}
                                textInfo={"Carrera 24c #4 - 114"}
                            />
                            <ClientProfileItemCard
                                icon={faEnvelope}
                                textInfo={"danmcode@gmail.com"}
                            />
                            <ClientProfileItemCard
                                icon={faPhone}
                                textInfo={"3108903571"}
                            />
                            <ClientProfileItemCard
                                icon={faBuilding}
                                textInfo={"Empresa"}
                            />

                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}