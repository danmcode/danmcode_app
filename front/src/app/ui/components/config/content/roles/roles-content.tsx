"use client"

import { Rol } from "@/app/lib/domain/entities/rol.entity";
import LoadingTable from "@/app/ui/loading-table";
import { useEffect, useState } from "react";
import RolesTable from "./roles-table";
import SearchBox from "../../../search-box";
import TextButton from "../../../text-button";
import IconButton from "../../../icon-button";
import { faFileExport, faPlus } from "@fortawesome/free-solid-svg-icons";

export default function RolesContent() {

    const [roles, setRol] = useState<Rol[] | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRol = async () => {
            try {
                const fetchedRoles = await Rol.getAll();
                setRol(fetchedRoles);
            } catch (error) {
                console.error('Failed to fetch roles', error);
            } finally {
                setLoading(false);
            }
        };

        fetchRol();
    }, []);

    if (loading) return (
        <div className="tab-pane fade show px-6">
            <LoadingTable
                data={[]}
                headers={Rol.headers()}
            />
        </div>
    )

    return (
        <div>
            <div className="tab-pane fade show px-6">

                <div className="row align-items-center justify-content-between mb-4">

                    <div className="col-auto">
                        <SearchBox placeHolder="Buscar Roles" />
                    </div>

                    <div className="col-auto">
                        <div className="d-flex align-items-center">
                            <TextButton
                                buttonHref={"#"}
                                buttonName={"Exportar"}
                                butonIcon={faFileExport}
                            />
                            <IconButton
                                buttonHref={"/admin/contacts/create-rol"}
                                buttonName={"Crear Roles"}
                                butonIcon={faPlus}
                            />
                        </div>
                    </div>
                </div>

                <RolesTable
                    data={roles!}
                    headers={Rol.headers()}
                />
            </div>
        </div>
    );

}