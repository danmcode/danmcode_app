import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UseFormRegister } from "react-hook-form";

interface Props {
  label: string;
  placeHolder: string;
  icon: IconProp;
  type: string;
  id: string;
  customClassName?: string;
  register?: ReturnType<UseFormRegister<any>>;
}

export default function FormIconInput(props: Props) {
  const { placeHolder, label, icon, type, id, customClassName, register } = props;

  return (
    <div className="form-icon-container">
      <div className="form-floating">
        <input
          className={`form-control form-icon-input ${customClassName || ''}`}
          id={id}
          type={type}
          placeholder={placeHolder}
          autoComplete="off"
          {...register} // React Hook Form maneja el valor y el onChange
        />
        <label className="text-body-tertiary form-icon-label">{label}</label>
      </div>
      <span className="text-body fs-9 form-icon">
        <FontAwesomeIcon icon={icon} />
      </span>
    </div>
  );
}
