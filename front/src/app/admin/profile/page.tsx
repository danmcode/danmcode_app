import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function ProfilePage() {

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Perfil', href: '/admin/profile', active: true},
    ];
    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
            <h2 className="text-bold text-body-emphasis mb-5"> Perfil de usuario </h2>
        </div>
    );
}