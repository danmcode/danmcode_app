import Breadcrumbs from "@/app/ui/components/breadcrumb";
import { faListDots, faUserShield } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function ConfigurationPage() {

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Configuración', href: '/admin/configuration', active: true },
    ];
    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle="Configuración" />

            <div className="row g-0 border-top border-bottom bg-color-primary">

                <div className="col-sm-4 h-100">
                    <div
                        className="nav flex-sm-column border-bottom border-bottom-sm-0 border-end-sm fs-9 vertical-tab h-100 justify-content-between"
                        role="tablist"
                        aria-orientation="vertical">

                        <a className="nav-link border-end border-end-sm-0 border-bottom-sm text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center active"
                            id="pricingTab"
                            data-bs-toggle="tab"
                            data-bs-target="#pricingTabContent"
                            role="tab"
                            aria-controls="pricingTabContent"
                            aria-selected="true">
                            <span className="me-sm-2 nav-iconss">
                                <FontAwesomeIcon icon={faListDots} />
                            </span>
                            <span className="d-none d-sm-inline"> Listas desplegables </span>
                        </a>

                        <a className="nav-link border-end border-end-sm-0 border-bottom-sm text-center text-sm-start cursor-pointer outline-none d-sm-flex align-items-sm-center"
                            id="restockTab"
                            data-bs-toggle="tab"
                            data-bs-target="#restockTabContent"
                            role="tab"
                            aria-controls="restockTabContent"
                            aria-selected="false">
                            <span className="me-sm-2 nav-iconss">
                                <FontAwesomeIcon icon={faUserShield} />
                            </span>
                            <span className="d-none d-sm-inline"> Roles </span>
                        </a>

                    </div>

                </div>
                <div className="col-sm-8">

                    <div className="tab-content py-3 ps-sm-4 h-100">

                        <div className="tab-pane fade show active" id="pricingTabContent" role="tabpanel">
                            <h4 className="mb-3 d-sm-none">Pricing</h4>

                            <div className="row g-3">

                                <div className="col-12 col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <div className="card-title">
                                                <div className="row align-items-center">
                                                    <h5 className="col-8">Listas</h5>
                                                    <button className="btn btn-sm btn-primary col-4 d-flex align-items-center justify-content-end">
                                                        <i className="fas fa-plus"></i> Añadir
                                                    </button>
                                                </div>
                                            </div>
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Tipos de identificación</li>
                                                <li className="list-group-item">Tipos de cliente</li>
                                                <li className="list-group-item"> Tipos de vehiculo</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="col-12 col-lg-6">
                                    <div className="card">
                                        <div className="card-body">
                                            <h5 className="card-title">Elementos</h5>
                                            <ul className="list-group list-group-flush">

                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="tab-pane fade h-100" id="restockTabContent" role="tabpanel" aria-labelledby="restockTab">
                            <div className="d-flex flex-column h-100">
                                <h5 className="mb-3 text-body-highlight">Add to Stock</h5>
                                <div className="row g-3 flex-1 mb-4">
                                    <div className="col-sm-7">
                                        <input className="form-control" type="number" placeholder="Quantity" />
                                    </div>
                                    <div className="col-sm">
                                        <button className="btn btn-primary" type="button"><span className="fa-solid fa-check me-1 fs-10"></span>Confirm</button>
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