"use client";


import { useState, useEffect } from 'react';
import Breadcrumbs from '@/app/ui/components/breadcrumb';
import ConfigMenu from '@/app/ui/components/config/menu';
import ConfigMenuContent from '@/app/ui/components/config/menu-content';
import { ConfigMenuItems } from '@/app/ui/components/config/menu-items';

export default function ConfigurationPage() {

    const [selectedMenuItemId, setSelectedMenuItemId] = useState<string | null>(null);

    const breadcrumbs = [
        { label: 'Inicio', href: '/admin' },
        { label: 'Configuración', href: '/admin/configuration', active: true },
    ];

    useEffect(() => {
        if (ConfigMenuItems.length > 0) {
            setSelectedMenuItemId(ConfigMenuItems[0].id);
        }
    }, []);

    const handleMenuItemClick = (id: string) => {
        setSelectedMenuItemId(id);
    };

    const selectedMenuItem = ConfigMenuItems.find(item => item.id === selectedMenuItemId);

    return (
        <div>
            <Breadcrumbs breadcrumbs={breadcrumbs} pageTitle="Configuración" />

            <div className="row g-0 border-top border-bottom bg-color-primary">
                <div className="col-sm-4 h-100">
                    <div
                        className="nav flex-sm-column border-bottom border-bottom-sm-0 border-end-sm fs-9 vertical-tab h-100 justify-content-between"
                        role="tablist"
                        aria-orientation="vertical"
                    >
                        {ConfigMenuItems.map((menuItem, index) => (
                            <ConfigMenu
                                key={menuItem.id}
                                configMenu={{
                                    icon: menuItem.icon,
                                    id: menuItem.id,
                                    target: menuItem.target,
                                    name: menuItem.name,
                                    index: index,
                                }}
                                onclick={() => handleMenuItemClick(menuItem.id)} />
                        ))}
                    </div>
                </div>

                <div className="col-sm-8">
                    <div className="tab-content py-3 ps-sm-4 h-100">
                        {selectedMenuItem && (
                            <div> {selectedMenuItem.content} </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
