import Breadcrumbs from "@/app/ui/components/breadcrumb";
import ContactForm from "@/app/ui/components/contacts/contact.form";
import VehicleForm from "@/app/ui/components/vehicles/vehicle.form";

export default function CreateVehiclePage() {
    const PAGE_TITLE = "Crear vehículo";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Vehiculos', href: '/admin/vehicles' },
        { label: PAGE_TITLE, href: '/admin/vehicles/create-vehicle', active: true }
    ];

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE} />
            
            <VehicleForm />
        </div>
    );

}