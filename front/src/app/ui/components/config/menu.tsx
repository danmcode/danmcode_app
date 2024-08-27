import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
    configMenu: {
        icon: IconProp;
        id: string;
        target: string;
        name: String;
        index: number
    };
    onclick: (id: string) => void;
}

export default function ConfigMenu(props: Props) {
    const { configMenu, onclick} = props;

    return (
        <a className={`nav-link border-end border-end-sm-0 border-bottom-sm text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center ${configMenu.index === 0 ? 'active' : ''}`}
            id={`${configMenu.id}`}
            data-bs-toggle="tab"
            data-bs-target={`#${configMenu.target}`}
            role="tab"
            aria-controls={`${configMenu.target}`}
            aria-selected="true"
            onClick={ () => onclick(configMenu.id) }
        >
            <span className="me-sm-2 nav-iconss">
                <FontAwesomeIcon icon={configMenu.icon} />
            </span>
            <span className="d-none d-sm-inline"> {`${configMenu.name}`}  </span>
        </a>
    );
}