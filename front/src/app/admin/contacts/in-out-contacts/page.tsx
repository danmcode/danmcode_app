import { InOutContactsData } from "@/app/lib/data/in-out-contacts.data";
import { InOutContacts } from "@/app/lib/domain/entities/in-out-contacts";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import InOutContactsTable from "@/app/ui/components/contacts/in-out-contacts/in-out-contacts.table";
import IconButton from "@/app/ui/components/icon-button";
import SearchBox from "@/app/ui/components/search-box";
import TextButton from "@/app/ui/components/text-button";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ContactsPage() {

    const PAGE_TITLE = "Ingreso y salida de contactos";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Contactos', href: '/admin/contacts' },
        { label: PAGE_TITLE, href: '/admin/contacts/in-out-contacts', active: true }
    ];

    const data = InOutContactsData();
    const headers = InOutContacts.headers();
    const actions = InOutContacts.actions();

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
            
            <div className="row align-items-center justify-content-between g-3 mb-4">

                <div className="col col-auto">
                    <SearchBox placeHolder="Buscar ingresos y salidas" />
                </div>

                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <TextButton
                            buttonHref={"#"}
                            buttonName={"Exportar"}
                            butonIcon={faFileExport}
                        />
                        <IconButton
                            buttonHref={"#"}
                            buttonName={"Registrar un nuevo ingreso"}
                            butonIcon={faPlus}
                        />
                    </div>
                </div>
            </div>

            <InOutContactsTable 
                data={data}
                headers={headers}
                actions={actions}
            />

            
        </div>
    );

}