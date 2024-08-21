
export default function DropDownContent() {

    return (
        <div className="row g-3">
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-body">
                        <div className="card-title">
                            <div className="row ">
                                <div className="col-10 align-self-center">
                                    <h5>Listas</h5>
                                </div>
                                <div className="d-flex justify-content-end col-2">
                                    <button className="btn btn-sm btn-primary">
                                        <i className="fas fa-plus"></i>
                                    </button>
                                </div>
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

    );

}