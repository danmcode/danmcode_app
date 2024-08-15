import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  label: string;
  placeHolder: string;
  icon: IconProp;
  id: string;
  customClassName? : string;
}

export default function FormIconTexrArea( props : Props ) {
  
    const { placeHolder, label, icon, id, customClassName = '' } = props;

    return (
    <div className="form-icon-container">
      <div className="form-floating">
        <textarea
          className={`form-control form-icon-input ${customClassName}`}
          id= {id}
          placeholder= { placeHolder }
        />
        <label className="text-body-tertiary form-icon-label">
            { label }
        </label>
      </div>
      <span className="text-body fs-9 form-icon">
        <FontAwesomeIcon icon={icon} />
      </span>
    </div>
  );
}
