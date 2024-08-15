import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

interface SubMenu {
    name: string;
    href: string;
    keyValue: string;
}

interface Props {
    menu: {
        menuHref: string;
        menuIcon: IconProp;
        menuName: string;
        keyValue: string;
        subMenus: SubMenu[];
    };
}

export default function Menu(props: Props) {
    const { menu } = props;
    return (
        <div className="nav-item-wrapper">
            <a
                className="nav-link dropdown-indicator label-1"
                href={`#${menu.menuHref}`}
                role="button"
                data-bs-toggle="collapse"
                aria-expanded="false"
                aria-controls={menu.menuHref}
            >
                <div className="d-flex align-items-center">
                    <div className="dropdown-indicator-icon">
                        <FontAwesomeIcon icon={faCaretRight} />
                    </div>
                    <span className="nav-link-icon">
                        <FontAwesomeIcon icon={menu.menuIcon} />
                    </span>
                    <span className="nav-link-text">
                        {menu.menuName}
                    </span>
                </div>
            </a>

            {menu.subMenus.map((subMenu: SubMenu) => {
                return (
                    <div className="parent-wrapper label-1" key={`parent-wrapper-${subMenu.keyValue}`}>
                        <ul
                            className="nav collapse parent"
                            data-bs-parent="#navbarVerticalCollapse"
                            id={menu.menuHref}
                        >
                            <li className="nav-item" key={subMenu.keyValue}>
                                <Link
                                    className="nav-link"
                                    href={`${subMenu.href}`} 
                                    data-bs-toggle=""
                                    aria-expanded="false"
                                >
                                    <div className="d-flex align-items-center">
                                        <span className="nav-link-text">
                                            {subMenu.name}
                                        </span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>
                );
            })}
        </div>
    );
}