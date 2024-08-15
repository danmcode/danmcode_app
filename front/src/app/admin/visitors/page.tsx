import { VisitorData } from "@/app/lib/data/visitor.data";
import { Visitor } from "@/app/lib/domain/entities/visitor";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import VisitorTable from "@/app/ui/components/visitors/visitor.table";

export default function VisitorsPage() {

    const PAGE_TITLE = "Visitantes";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/vehicles', active: true }
    ];

    const data = VisitorData();
    const headers = Visitor.headers();
    const actions = Visitor.actions();

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
        
            <VisitorTable 
                data={data}
                headers={headers}
                actions={actions}
            />
        
        </div>
    );

}