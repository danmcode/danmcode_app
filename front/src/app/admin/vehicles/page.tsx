import { VehicleData } from "@/app/lib/data/vehicle.data";
import { Vehicle } from "@/app/lib/domain/entities/vehicle.entity";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import IconButton from "@/app/ui/components/icon-button";
import SearchBox from "@/app/ui/components/search-box";
import TextButton from "@/app/ui/components/text-button";
import VehicleTable from "@/app/ui/components/vehicles/vehicle.table";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function VehiclesPage() {

    const PAGE_TITLE = "Vehículos";

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: PAGE_TITLE, href: '/admin/vehicles', active: true }
    ];

    const data = VehicleData();
    const headers = Vehicle.headers();
    const actions = Vehicle.actions();

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle={PAGE_TITLE}/>
            <div className="row align-items-center justify-content-between g-3 mb-4">

                <div className="col col-auto">
                    <SearchBox placeHolder="Buscar Vehículos" />
                </div>

                <div className="col-auto">
                    <div className="d-flex align-items-center">
                        <TextButton
                            buttonHref={"#"}
                            buttonName={"Exportar"}
                            butonIcon={faFileExport}
                        />
                        <IconButton
                            buttonHref={"/admin/vehicles/create-vehicle"}
                            buttonName={"Crear vehículo"}
                            butonIcon={faPlus}
                        />
                    </div>
                </div>
            </div>

            <VehicleTable 
                data={data}
                headers={headers}
                actions={actions}
            />


        </div>
    );

}