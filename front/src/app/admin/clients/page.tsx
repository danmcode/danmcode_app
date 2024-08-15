import { ClientsData } from "@/app/lib/data/client.data"
import { Client } from "@/app/lib/domain/entities/client.entity"
import Breadcrumbs from "@/app/ui/components/breadcrumb"
import ClientsTable from "@/app/ui/components/clients/clients.table"
import IconButton from "@/app/ui/components/icon-button"
import SearchBox from "@/app/ui/components/search-box"
import TextButton from "@/app/ui/components/text-button"
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons"

export default function ClientsPage() {

    const PAGE_TITLE = "Clientes";
    const headers = Client.headers();
    const actions = Client.actions();
    const data = ClientsData();

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/clients', active: true }
    ];

    return (
        <div>

            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE} />

            <div className="row align-items-center justify-content-between g-3 mb-4">

                <div className="col col-auto">
                    <SearchBox placeHolder="Buscar clientes" />
                </div>

                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <TextButton
                            buttonHref={"#"}
                            buttonName={"Exportar"}
                            butonIcon={faFileExport}
                        />
                        <IconButton
                            buttonHref={"/admin/clients/create-client"}
                            buttonName={"Crear cliente"}
                            butonIcon={faPlus}
                        />
                    </div>
                </div>
            </div>
            
            <ClientsTable headers={headers} actions={actions} data={data} />

        </div>
    )
}