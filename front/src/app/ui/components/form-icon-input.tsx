import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
  label: string;
  placeHolder: string;
  icon: IconProp;
  type: string;
  id: string;
  customClassName? : string;
}

export default function FormIconInput( props : Props ) {
  
    const { placeHolder, label, icon, type, id, customClassName = '' } = props;

    return (
    <div className="form-icon-container">
      <div className="form-floating">
        <input
          className={`form-control form-icon-input ${customClassName}`}
          id= {id}
          type= {type}
          placeholder= { placeHolder }
          autoComplete="off" 
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
