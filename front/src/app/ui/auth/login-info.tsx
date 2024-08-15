import Image from "next/image";

export default function LoginInfo({ assetPath = '/icons/draw_login.svg' }: { assetPath : string }) {
  return (
    <div className="col-auto bg-body-highlight  rounded-3 position-relative overflow-hidden auth-title-box">
      <div className="bg-holder"></div>
      <div className="position-relative px-4 px-lg-7 pt-7 pb-5 pb-sm-5 text-center text-md-start pb-lg-7 pb-md-7">
        <h3 className="mb-3 text-body-emphasis fs-7"> Danmcode </h3>

        <p className="text-body-tertiary">
            Control de accesos
        </p>

        <ul className="list-unstyled mb-0 w-max-content w-md-auto">
          <li className="d-flex align-items-center">
            <span className="uil uil-check-circle text-success me-2"></span>
            <span className="text-body-tertiary fw-semibold">Visitantes</span>
          </li>

          <li className="d-flex align-items-center">
            <span className="uil uil-check-circle text-success me-2"></span>
            <span className="text-body-tertiary fw-semibold">Minutas</span>
          </li>

          <li className="d-flex align-items-center">
            <span className="uil uil-check-circle text-success me-2"></span>
            <span className="text-body-tertiary fw-semibold">Correspondencia</span>
          </li>
        </ul>
      </div>

      <div className="position-relative z-n1 mb-6 d-none d-md-block text-center mt-md-5">
        <Image
          src={ assetPath }
          alt="login"
          height={250}
          width="250"
        />
      </div>
      
    </div>
  );
}