import Breadcrumbs from "@/app/ui/components/breadcrumb";
import IconButton from "@/app/ui/components/icon-button";
import SearchBox from "@/app/ui/components/search-box";
import TextButton from "@/app/ui/components/text-button";
import {
  faFileExport,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
export default function PermissionsPage() {

  const breadcrumbs = [
    {label: 'Inicio', href: '/admin'},
    {label: 'Permisos', href: '/admin/permissions', active: true}
  ];

  return (
    <div>
      
      <Breadcrumbs breadcrumbs={breadcrumbs}/>

      <h2 className="text-bold text-body-emphasis mb-5">Permisos de usuario</h2>

    </div>
  );
}