import { IconProp } from "@fortawesome/fontawesome-svg-core";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface Props {
  buttonHref: string;
  buttonName: string;
  butonIcon: IconProp;
}

export default function TextButton(props: Props) {
  const { buttonHref, buttonName, butonIcon } = props;

  return (
    <Link className="btn btn-link text-body me-4 px-0" href={buttonHref}>
      <span className="me-2">
        <FontAwesomeIcon icon={butonIcon} />
      </span>
      {buttonName}
    </Link>
  );
}