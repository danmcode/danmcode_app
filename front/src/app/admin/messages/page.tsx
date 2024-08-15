import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function MessagesPage() {

    const PAGE_TITLE = "Mensajes";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/messages', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        </div>
    );
}