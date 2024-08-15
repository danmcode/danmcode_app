import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function CorrespondencesPage() {

    const PAGE_TITLE = "Correspondencias";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/correspondences', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        </div>
    );
}