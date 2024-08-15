import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function InOutVisitorsPage() {

    const PAGE_TITLE = "Ingreso y salida de visitantes";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/vehicles', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        </div>
    );
}