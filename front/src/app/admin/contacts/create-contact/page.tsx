import { Contact } from "@/app/lib/domain/entities/contact.entity";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import ContactForm from "@/app/ui/components/contacts/contact.form";

export default function CreateContactPage() {
    const PAGE_TITLE = "Crear contacto";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/clients', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE} />
            
            <ContactForm />
        </div>
    );

}