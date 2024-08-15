import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function DocsPage() {

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Documentación', href: '/admin/docs', active: true},
    ];
    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="text-bold text-body-emphasis mb-5"> Documentación </h2>
        </div>
    );
}