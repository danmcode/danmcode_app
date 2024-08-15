import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  itemName: string;
  icon: IconProp;
  href: string;
  keyValue: string;
}

export default function NavItem(props: Props) {

  const { itemName, icon, href, keyValue } = props;
  return (
    <li className="nav-item" key={keyValue}>
      <div className="nav-item-wrapper">
        <div className="nav-item-wrapper">
          <a
            className="nav-link label-1"
            href={href}
            role="button"
            data-bs-toggle=""
            aria-expanded="false"
          >
            <div className="d-flex align-items-center">
              <span className="nav-link-icon">
                <FontAwesomeIcon icon={icon} />
              </span>
              <span className="nav-link-text-wrapper">
                <span className="nav-link-text"> {itemName} </span>
              </span>
            </div>
          </a>
        </div>
      </div>
    </li>
  );
}