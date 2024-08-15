import IconButton from "@/app/ui/components/icon-button";
import {
  faEye,
  faInfo,
  faInfoCircle,
  faPencil,
  faSave,
  faTrash,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import FormIconInput from "../../../ui/components/form-icon-input";
import FormIconTexrArea from "@/app/ui/components/form-icon-text-area";
import TextButton from "@/app/ui/components/text-button";

export default function ProfilesPage() {
  return (
    <div>
      <div className="container-small">
        <nav className="mb-2" aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <a href="#!">Inicio</a>
            </li>
            <li className="breadcrumb-item">
              <a href="#!">Usuarios</a>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Perfiles
            </li>
          </ol>
        </nav>
        <div className="row align-items-center justify-content-between g-3 mb-4">
          <div className="col-auto">
            <h2 className="mb-0">Perfiles </h2>
          </div>
        </div>
        <div className="row g-3 mb-6">
          <div className="col-12 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <FormIconInput
                  label={"Nombre del perfil"}
                  placeHolder={"Perfil"}
                  icon={faUser}
                  type={"text"}
                  id={"inputProfile"}
                />

                <FormIconTexrArea
                  label={"Descripción"}
                  placeHolder={"Descripción del perfil"}
                  icon={faInfoCircle}
                  id={"description"}
                  customClassName="mt-3"
                />

                <div className="border-bottom border-dashed pb-4"></div>
                <div className="pt-4">
                  <div className="text-end">
                    <IconButton
                      buttonHref={"/admin-module/users/create-user"}
                      buttonName={"Crear perfil"}
                      butonIcon={faSave}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-lg-8">
            <div className="card h-100">
              <div className="card-body">
                <div className="table-responsive scrollbar ms-n1 ps-1">
                  <table className="table table-sm fs-9 mb-0">
                    <thead>
                      <tr>
                        <th className="white-space-nowrap fs-9 align-middle ps-0">
                          <div className="form-check mb-0 fs-8">
                            <input
                              className="form-check-input"
                              id="checkbox-bulk-members-select"
                              type="checkbox"
                              data-bulk-select='{"body":"members-table-body"}'
                            />
                          </div>
                        </th>
                        <th
                          className="sort align-middle"
                          scope="col"
                          data-sort="customer"
                        >
                          PERFIL
                        </th>
                        <th
                          className="sort align-middle"
                          scope="col"
                          data-sort="email"
                        >
                          DESCRIPCIÓN
                        </th>

                        <th
                          className="sort align-middle pe-0"
                          scope="col"
                          data-sort="joined"
                        >
                          ACCIONES
                        </th>
                      </tr>
                    </thead>
                    <tbody className="list" id="members-table-body">
                      <tr className="hover-actions-trigger btn-reveal-trigger position-static">
                        <td className="fs-9 align-middle ps-0 py-3">
                          <div className="form-check mb-0 fs-8">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              data-bulk-select-row='{"customer":{"avatar":"/team/25.webp","name":"Michael Jenkins"},"email":"jenkins@example.com","mobile":"+3026138829","city":"Philadelphia","lastActive":"12 hours ago","joined":"Oct 3, 8:30 AM"}'
                            />
                          </div>
                        </td>

                        <td className="last_active align-middle white-space-nowrap text-body-tertiary">
                          Administrador del sistema
                        </td>
                        <td className="last_active align-middle white-space-nowrap text-body-tertiary">
                          Usuario que tiene acceso a todos los modulos del aplicativo
                        </td>

                        <td className="joined align-middle white-space-nowrap text-body-tertiary">
                          <div className="row ">
                            <div className="col-auto">
                              <TextButton
                                buttonHref={"#"}
                                buttonName={""}
                                butonIcon={faEye}
                              />
                              <TextButton
                                buttonHref={"#"}
                                buttonName={""}
                                butonIcon={faPencil}
                              />
                              <TextButton
                                buttonHref={"#"}
                                buttonName={""}
                                butonIcon={faTrash}
                              />
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="row align-items-center justify-content-between py-2 pe-0 fs-9">
                  <div className="col-auto d-flex">
                    <p
                      className="mb-0 d-none d-sm-block me-3 fw-semibold text-body"
                      data-list-info="data-list-info"
                    ></p>
                    <a className="fw-semibold" href="#!" data-list-view="*">
                      Ver todo
                      <span
                        className="fas fa-angle-right ms-1"
                        data-fa-transform="down-1"
                      ></span>
                    </a>
                    <a
                      className="fw-semibold d-none"
                      href="#!"
                      data-list-view="less"
                    >
                      Ver menos
                      <span
                        className="fas fa-angle-right ms-1"
                        data-fa-transform="down-1"
                      ></span>
                    </a>
                  </div>
                  <div className="col-auto d-flex">
                    <button className="page-link" data-list-pagination="prev">
                      <span className="fas fa-chevron-left"></span>
                    </button>
                    <ul className="mb-0 pagination"></ul>
                    <button
                      className="page-link pe-0"
                      data-list-pagination="next"
                    >
                      <span className="fas fa-chevron-right"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
