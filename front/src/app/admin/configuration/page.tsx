import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function ConfigurationPage() {

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Configuración', href: '/admin/configuration', active: true},
    ];
    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="text-bold text-body-emphasis mb-5"> Configuración </h2>
        </div>
    );
}