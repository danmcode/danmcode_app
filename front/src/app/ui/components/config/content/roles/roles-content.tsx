"use client"

import { Rol } from "@/app/lib/domain/entities/rol.entity";
import LoadingTable from "@/app/ui/loading-table";
import { useEffect, useState } from "react";
import RolesTable from "./roles-table";

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
                <RolesTable
                    data={roles!}
                    headers={Rol.headers()}
                />
            </div>
        </div>
    );

}