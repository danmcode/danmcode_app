import { ContactData } from "@/app/lib/data/contact.data";
import { Contact } from "@/app/lib/domain/entities/contact.entity";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import ContactsTable from "@/app/ui/components/contacts/contacts.table";
import IconButton from "@/app/ui/components/icon-button";
import SearchBox from "@/app/ui/components/search-box";
import TextButton from "@/app/ui/components/text-button";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ContactsPage() {
    const PAGE_TITLE = "Contactos";
    const headers = Contact.headers();
    const actions = Contact.actions();
    const data = ContactData();

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/contacts/', active: true }
    ];


    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE} />

            <div className="row align-items-center justify-content-between g-3 mb-4">

                <div className="col col-auto">
                    <SearchBox placeHolder="Buscar contactos" />
                </div>

                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <TextButton
                            buttonHref={"#"}
                            buttonName={"Exportar"}
                            butonIcon={faFileExport}
                        />
                        <IconButton
                            buttonHref={"/admin/contacts/create-contact"}
                            buttonName={"Crear contacto"}
                            butonIcon={faPlus}
                        />
                    </div>
                </div>
            </div>

            <ContactsTable headers={headers} data={data} actions={actions}/>

        </div>
    );

}