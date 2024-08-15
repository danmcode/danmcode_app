import Image from "next/image";
import {
  faBuilding,
  faEnvelope,
  faPhone,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import UserProfileItemCard from "@/app/ui/components/users/user-profile-item-card";

export default function UserProfileCard() {
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
            src="/images/user_danmcode.jpeg"
            width="200"
            height={200}
            alt=""
          />
        </label>
      </div>
      <div className="card-body">
        <div className="row">
          <div className="col-12">
            <div className="d-flex flex-wrap mb-2 align-items-center">
              <h3 className="me-2"> Daniel Muelas </h3>
              <span className="fw-normal fs-8"> @danmcode </span>
            </div>
            <div className="d-flex d-xl-block d-xxl-flex align-items-center">
              <UserProfileItemCard
                icon={faEnvelope}
                textInfo={"danmcode@gmail.com"}
              />
              <UserProfileItemCard
                icon={faPhone}
                textInfo={"3108903571"}
              />
              <UserProfileItemCard
                icon={faBuilding}
                textInfo={"danmcode INC"}
              />
              <UserProfileItemCard
                icon={faUser}
                textInfo={"Administrador del sistema"}
              />

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}