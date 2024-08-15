import { UsersData } from "@/app/lib/data/user.data";
import { User } from "@/app/lib/domain/entities/user.entity";
import Breadcrumbs from "@/app/ui/components/breadcrumb";
import IconButton from "@/app/ui/components/icon-button";
import SearchBox from "@/app/ui/components/search-box";
import TextButton from "@/app/ui/components/text-button";
import UserTable from "@/app/ui/components/users/user.table";
import {
  faFileExport,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function UsersPage() {

  const actions = User.actions();
  const headers = User.headers();
  const data = UsersData();
  const breadcrumbs = [
    {label: 'Inicio', href: '/admin'},
    {label: 'Usuarios', href: '/admin/users', active: true}
  ];

  return (
    <div>
      
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <h2 className="text-bold text-body-emphasis mb-5">Usuarios</h2>

      <div className="row align-items-center justify-content-between g-3 mb-4">
        
        <div className="col col-auto">
            <SearchBox placeHolder="Buscar usuarios" />
        </div>

        <div className="col-auto">
          <div className="d-flex align-items-center">
            <TextButton
              buttonHref={"#"}
              buttonName={"Exportar"}
              butonIcon={faFileExport}
            />
            <IconButton
              buttonHref={"/admin/users/create-user"}
              buttonName={"Crear usuario"}
              butonIcon={faPlus}
            />
          </div>
        </div>
      </div>
      <UserTable headers={headers} actions={actions} data={data} />
    </div>
  );
}