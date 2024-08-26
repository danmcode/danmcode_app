"use client"

import { Rol } from "@/app/lib/domain/entities/rol.entity";
import { useEffect, useState } from "react";

export default function RolesContent() {

    const [rol, setRol] = useState<Rol | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const fetchedUsers = await Rol.getAll();
                fetchedUsers.forEach((role: Rol) => {
                    console.log(role.id); // Accede a la propiedad 'id' de cada rol
                });
                // setRol(fetchedUser);
            } catch (error) {
                console.error('Failed to fetch user', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    });

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1>User Details</h1>
            {rol && (
                <div>
                    <h2>{rol.role_name}</h2>
                    <p>{rol.description}</p>
                </div>
            )}
        </div>
    );

}