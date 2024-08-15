import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  icon: IconProp;
  textInfo: string;
}

export default function UserProfileItemCard(props: Props) {
  const { icon, textInfo } = props;

  return (
    <div className="d-flex mb-xl-2 mb-xxl-0">
      <span className="fs-10 me-2 me-lg-1 me-xl-2"></span>
      <h6 className="d-inline-block mb-0">
        <FontAwesomeIcon icon={icon} />
        <span className="fw-semibold ms-1 me-4"> {textInfo} </span>
      </h6>
    </div>
  );
}
