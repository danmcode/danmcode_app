import { Rol } from "@/app/lib/domain/entities/rol.entity";

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
                                <td>
                                    {rol.role_name}
                                </td>
                                <td>
                                    {rol.description}
                                </td>
                                <td>
                                    {rol.is_active}
                                </td>
                                <td>
                                    {rol.is_active}
                                </td>
                            </tr>
                        ))}
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
                    <a className="fw-semibold d-none" href="#!" data-list-view="less">
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
                    <button className="page-link pe-0" data-list-pagination="next">
                        <span className="fas fa-chevron-right"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}