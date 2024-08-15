import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import TextButton from "../text-button";

interface Action {
    actionName: string;
    icon: IconDefinition;
    href: string;
}

interface TableRow {
    [key: string]: any;
}

interface TableProps {
    data: TableRow[];
    headers: string[];
    actions: Action[];
}

export default function UserTable(props: TableProps) {

    const { data, headers, actions } = props;

    return (
        <div className="mx-n4 mx-lg-n6 px-4 px-lg-6 mb-9 bg-body-emphasis border-y mt-2 position-relative top-1">
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
                        {data.map((item) => (
                            <tr
                                className="hover-actions-trigger btn-reveal-trigger position-static"
                                key={item.id}
                            >
                                <td>
                                    <div className="form-check mb-0 fs-8">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            data-bulk-select-row='{"customer":{"avatar":"/team/25.webp","name":"Michael Jenkins"},"email":"jenkins@example.com","mobile":"+3026138829","city":"Philadelphia","lastActive":"12 hours ago","joined":"Oct 3, 8:30 AM"}'
                                        />
                                    </div>
                                </td>

                                <td className="customer align-middle white-space-nowrap">
                                    <a
                                        className="d-flex align-items-center text-body text-hover-1000"
                                        href="#!"
                                    >
                                        <div className="avatar avatar-m">
                                            <img
                                                className="rounded-circle"
                                                src={item.photoPath}
                                                alt=""
                                            />
                                        </div>
                                        <h6 className="mb-0 ms-3 fw-semibold">
                                            {`${item.name} ${item.lastName}`}
                                        </h6>
                                    </a>
                                </td>

                                <td className="email align-middle white-space-nowrap">
                                    <a className="fw-semibold" href="mailto:jenkins@example.com">
                                        {item.email}
                                    </a>
                                </td>

                                <td className="mobile_number align-middle white-space-nowrap">
                                    <a
                                        className="fw-bold text-body-emphasis"
                                        href={`tel:${item.cellPhone}`}
                                    >
                                        {item.cellPhone}
                                    </a>
                                </td>

                                <td className="city align-middle white-space-nowrap text-body">
                                    {item.puesto}
                                </td>

                                <td className="last_active align-middle white-space-nowrap text-body-tertiary">
                                    {item.profile}
                                </td>

                                <td className="joined align-middle white-space-nowrap text-body-tertiary">
                                    {actions.map((action) => (
                                        <TextButton
                                            buttonHref={"#"}
                                            buttonName={""}
                                            butonIcon={action.icon}
                                        />
                                    ))}
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