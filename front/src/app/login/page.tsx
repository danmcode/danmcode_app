'use client';
import LoginInfo from "../ui/auth/login-info";
import LoginForm from "../ui/auth/login-form";

export default function Home() {
  return (
    <main>
      <div className="container-fluid">
        <div className="row flex-center position-relative g-0 py-10">
          <div className="col-11 col-sm-10 col-xl-8">
            <div className="card border border-translucent auth-card">
              <div className="card-body pe-md-0">
                <div className="row align-items-center gx-0 gy-7">
                  <LoginInfo
                    assetPath={"/icons/draw_login.svg"}
                  />
                  <div className="col mx-auto">
                    <div className="auth-form-box">
                      <LoginForm />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}