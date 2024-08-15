import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

export default function NavBarNotifications() {
  return (
    <li className="nav-item dropdown" key="nav-bar-notifications">
      <a
        className="nav-link"
        href="#"
        role="button"
        data-bs-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        data-bs-auto-close="outside"
      >
        <FontAwesomeIcon icon={faBell} size="xl" />
      </a>
      <div
        className="dropdown-menu dropdown-menu-end notification-dropdown-menu py-0 shadow border navbar-dropdown-caret"
        id="navbarDropdownNotfication"
        aria-labelledby="navbarDropdownNotfication"
      >
        <div className="card position-relative border-0">
          <div className="card-header p-2">
            <div className="d-flex justify-content-between">
              <h5 className="text-body-emphasis mb-0"> Notificaciones </h5>
              <button className="btn btn-link p-0 fs-9 fw-normal" type="button">
                {" "}
                Marcar todas como leidas{" "}
              </button>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="scrollbar-overlay">
              <div className="px-2 px-sm-3 py-3 notification-card position-relative read border-bottom">
                <div className="d-flex align-items-center justify-content-between position-relative">
                  <div className="d-flex">
                    <div className="avatar avatar-m status-online me-3">
                      <Image
                        className="rounded-circle"
                        src="/images/user_danmcode.jpeg"
                        alt="danmcode"
                        width="27"
                        height={"27"}
                      />
                    </div>
                    <div className="flex-1 me-sm-3">
                      <h4 className="fs-9 text-body-emphasis">Daniel Alexander Muelas</h4>
                      <p className="fs-9 text-body-highlight mb-2 mb-sm-3 fw-normal">
                        <span className="me-1 fs-10"> </span>
                        Ingreso peatonal
                        <span className="ms-2 text-body-quaternary text-opacity-75 fw-bold fs-10">
                          10m
                        </span>
                      </p>
                      <p className="text-body-secondary fs-9 mb-0">
                        <span className="me-1 fas fa-clock"></span>
                        <span className="fw-bold">10:41 AM </span>Agosto 7,2023
                      </p>
                    </div>
                  </div>
                  <div className="d-none d-sm-block">
                    <button
                      className="btn fs-10 btn-sm dropdown-toggle dropdown-caret-none transition-none notification-dropdown-toggle"
                      type="button"
                      data-bs-toggle="dropdown"
                      data-boundary="window"
                      aria-haspopup="true"
                      aria-expanded="false"
                      data-bs-reference="parent"
                    >
                      <span className="fas fa-ellipsis-h fs-10 text-body"></span>
                    </button>
                    <div className="dropdown-menu dropdown-menu-end py-2">
                      <a className="dropdown-item" href="#!">
                        Marcar como leido
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card-footer p-0 border-top border-translucent border-0">
            <div className="my-2 text-center fw-bold fs-10 text-body-tertiary text-opactity-85">
              <a className="fw-bolder" href="pages/notifications.html">
                Historial de notificaciones
              </a>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}
