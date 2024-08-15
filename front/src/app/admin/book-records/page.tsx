import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function BookRecordsPage() {

    const PAGE_TITLE = "Minutas";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/book-records', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        </div>
    );
}