import { Rol } from "@/app/lib/domain/entities/rol.entity";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TableRow {
    [key: string]: any;
}

interface TableProps {
    data: Rol[];
    headers: string[];
}

export default function RolesTable(props: TableProps) {
    const { data, headers } = props;
    const randomIndex = () => Math.floor(Math.random() * (7 - 3 + 1)) + 3;

    return (
        <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-body-emphasis border-y mt-2 ">
            <div className="table-responsive scrollbar ms-n1 ps-1">
                <table className="table table-sm fs-9 mb-0">
                    <thead>
                        <tr>
                            {headers.map((header) => (
                                <th
                                    className="sort align-middle"
                                    scope="col"
                                    data-sort="customer"
                                >
                                    {header}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody className="list" id="members-table-body">
                        {data.map((rol) => (
                            <tr>
                                <td>{rol.role_name}</td>
                                <td>{rol.description}</td>
                                <td>
                                    <div className={`badge badge-danmcode fs-10 badge-danmcode-${rol.is_active ? "success" : "danger"}`}>
                                        <span className="fw-bold">
                                            {(rol.is_active) ? "Activo" : "Inactivo"}
                                        </span>
                                    </div>
                                </td>
                                <td>
                                    <div className="btn-reveal-trigger position-static">
                                        <button
                                            className="btn btn-sm dropdown-toggle dropdown-caret-none transition-none btn-reveal fs-10"
                                            type="button"
                                            data-bs-toggle="dropdown"
                                            data-boundary="window"
                                            aria-haspopup="true"
                                            aria-expanded="false"
                                            data-bs-reference="parent"
                                        >
                                            <span className="fas fa-ellipsis-h fs-10"></span>
                                        </button>

                                        <div className="dropdown-menu dropdown-menu-end py-2">
                                            {Rol.actions().map((action, index) => (
                                                <a className="dropdown-item" href={action.href}>
                                                    <FontAwesomeIcon icon={action.icon} />  {action.actionName}
                                                </a>
                                            ))}

                                            <div className="dropdown-divider"></div>
                                            <a className="dropdown-item text-danger" href="#!">
                                            <FontAwesomeIcon icon={faTrash} />Eliminar
                                            </a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="d-flex justify-content-center mt-3">
                <button className="page-link" data-list-pagination="prev">
                    <span className="fas fa-chevron-left"></span>
                </button>
                <ul className="mb-0 pagination"></ul>
                <button className="page-link pe-0" data-list-pagination="next">
                    <span className="fas fa-chevron-right"></span>
                </button>
            </div>
        </div>
    );
}
