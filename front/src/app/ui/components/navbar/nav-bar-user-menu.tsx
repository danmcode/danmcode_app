import { faBookAtlas, faCog, faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";

const UserMenuLinks = [
  { name: "Perfil", key: "profile", href: "/admin/profile", icon: faUser },
  { name: "Configuración", key: "config", href: "/admin/configuration", icon: faCog },
  { name: "Documentación", key: "docs", href: "/admin/docs", icon: faBookAtlas },
];

export default function NavBarUserMenu() {
  return (
    <li className="nav-item dropdown" key="nav-user-menu">
      <a
        className="nav-link lh-1 pe-0"
        id="navbarDropdownUser"
        href="#!"
        role="button"
        data-bs-toggle="dropdown"
        data-bs-auto-close="outside"
        aria-haspopup="true"
        aria-expanded="false"
      >
        <div className="avatar avatar-l ">
          <Image
            className="rounded-circle"
            src="/images/user_danmcode.jpeg"
            alt="danmcode"
            width="27"
            height={"27"}
          />
        </div>
      </a>
      <div
        className="dropdown-menu dropdown-menu-end navbar-dropdown-caret py-0 dropdown-profile shadow border"
        aria-labelledby="navbarDropdownUser"
      >
        <div className="card position-relative border-0">
          <div className="card-body p-0">
            <div className="text-center pt-4 pb-3">
              <div className="avatar avatar-xl">
                <Image
                  className="rounded-circle"
                  src="/images/user_danmcode.jpeg"
                  alt="danmcode"
                  width="50"
                  height={"50"}
                />
              </div>
              <h6 className="mt-2 text-body-emphasis">Daniel Muelas</h6>
            </div>
          </div>

          <div className="overflow-auto scrollbar">
            <ul className="nav d-flex flex-column mb-2 pb-1">
              {UserMenuLinks.map((link) => {
                return (
                  <li className="nav-item" key={link.key}>
                    <a className="nav-link px-3" href={link.href}>
                      <span className="me-2 text-body" data-feather="user">
                        <FontAwesomeIcon icon={link.icon} />
                      </span>
                      <span> {link.name} </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="card-footer p-0 border-top border-translucent">
            <div className="px-3 py-2">
              <Link
                className="btn btn-danmcode-secondary d-flex flex-center w-100"
                href="/login"
              >
                <span className="me-2" data-feather="log-out">
                  <FontAwesomeIcon icon={faSignOut} />
                </span>
                Cerrar sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}