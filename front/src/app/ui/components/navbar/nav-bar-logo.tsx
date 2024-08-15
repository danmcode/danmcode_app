import Image from "next/image";
import Link from "next/link";

export default function NavBarLogo() {
  return (
    <div className="navbar-logo">
      <button
        className="btn navbar-toggler navbar-toggler-humburger-icon hover-bg-transparent"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarVerticalCollapse"
        aria-controls="navbarVerticalCollapse"
        aria-expanded="false"
        aria-label="Toggle Navigation"
      >
        <span className="navbar-toggle-icon">
          <span className="toggle-line"></span>
        </span>
      </button>

      <Link className="navbar-brand me-1 me-sm-3" href="/admin">
        <div className="d-flex align-items-center">
          <div className="d-flex align-items-center">
            <Image
              src="/icons/danmcode-icon_ligth.svg"
              alt="danmcode"
              width="27"
              height={"27"}
            />
            <p className="logo-text ms-2 d-none d-sm-block">danmcode</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
