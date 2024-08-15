import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  buttonHref: string;
  buttonName: string;
  butonIcon: IconProp;
}

export default function IconButton(props: Props) {
  const { buttonHref, buttonName, butonIcon } = props;

  return (
    <Link className="btn btn-primary" href={buttonHref}>
      <span className="me-2">
        <FontAwesomeIcon icon={butonIcon} />
      </span>
      {buttonName}
    </Link>
  );
}