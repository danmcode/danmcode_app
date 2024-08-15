import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function SideBarFooter() {
    return(
        <div className="navbar-vertical-footer">
        <button className="btn navbar-vertical-toggle border-0 fw-semibold w-100 white-space-nowrap d-flex align-items-center">
          <span className="fs-8">
            <FontAwesomeIcon icon={faArrowLeft} />
          </span>
          <span className="uil uil-arrow-from-right fs-8">
            <FontAwesomeIcon icon={faArrowRight} />
          </span>
          <span className="navbar-vertical-footer-text ms-2">Contraer</span>
        </button>
      </div>
    );
}