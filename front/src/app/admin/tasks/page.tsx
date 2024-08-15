import Breadcrumbs from "@/app/ui/components/breadcrumb";

export default function TasksPage() {

    const PAGE_TITLE = "Tareas";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/tasks', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        </div>
    );
}