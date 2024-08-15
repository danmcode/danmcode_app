"use client";

import { useEffect } from "react";
import { SideBarLinks } from "@/app/ui/components/sidebar/side-bar-links";
import Menu from "@/app/ui/components/sidebar/menu";
import SideBarFooter from './side-bar-footer';
import { faHome } from "@fortawesome/free-solid-svg-icons";
import NavItem from "./nav-item";

export default function SideBar() {
  return (
    <nav className={`navbar navbar-vertical navbar-expand-lg`}>
      <div className="collapse navbar-collapse" id="navbarVerticalCollapse">
        <div className="navbar-vertical-content">
          <ul className="navbar-nav flex-column" id="navbarVerticalNav">
            <NavItem itemName={"Inicio"} icon={faHome} href={"/admin"} keyValue={"nav-home"} />

            {SideBarLinks.map((navItem, index) => {
              const group = navItem.groupMenu;
              const menus = navItem.groupMenu.menus;
              return (

                <li className="nav-item" key={`${group.keyValue}-${index.toString()}`}>
                  <p className="navbar-vertical-label">{group.groupName}</p>
                  <hr className="navbar-vertical-line"></hr>


                  {menus.map((menu) => {
                    return <Menu menu={menu} key={`${menu.keyValue}-${index}`}/>;
                  })}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <SideBarFooter />

    </nav>
  );
}