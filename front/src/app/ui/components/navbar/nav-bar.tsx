"use client";

import { useEffect } from "react";
import NavBarLogo from "./nav-bar-logo";
import NavBarNotifications from './nav-bar-notifications';
import NavBarUserMenu from "./nav-bar-user-menu";

export default function NavBar() {
  useEffect(() => {
    require("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <nav
      className={`navbar navbar-top fixed-top navbar-expand`}
      id="navbarDefault"
    >
      <div className="collapse navbar-collapse justify-content-between">

        <NavBarLogo />

        <ul className="navbar-nav navbar-nav-icons flex-row">
          <NavBarNotifications />
          <NavBarUserMenu />
        </ul>
      </div>
    </nav>
  );
}
