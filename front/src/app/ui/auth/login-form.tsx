'use client';

import { loginValidations } from "@/lib/domain/validations/login.validations";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Inputs = {
  username: string;
  password: string;
}

export default function LoginForm() {

  const { register, handleSubmit, formState: { errors } } = useForm<Inputs>({
    resolver: zodResolver(loginValidations)
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  return (
    <form onSubmit={handleSubmit(data => {
      setLoading(true);

      setTimeout(() => {
        router.push('/admin');
        setLoading(false);
      }, 2000);

    })}>
      <div className="text-center mb-7">
        <a
          className="d-flex flex-center text-decoration-none mb-4"
          href="../../../index.html"
        >
          <div className="d-flex align-items-center fw-bolder fs-3 d-inline-block">
            <Image
              src="/icons/danmcode-icon_ligth.svg"
              alt="danmcode"
              height={58}
              width="58"
            />
          </div>
        </a>

        <h3 className="text-body-highlight"> Iniciar Sesión </h3>
        <p className="text-body-tertiary">Obtenga acceso a su cuenta</p>
      </div>

      <div className="mb-3 text-start">
        <label className="form-label"> Usuario </label>
        <div className="form-icon-container">
          <input
            className="form-control form-icon-input"
            id="email"
            type="email"
            placeholder="damcode"
            {...register('username')}
          />
          {errors.username && (
            <div className="text-danger fs-9 fw-bolder">{errors.username.message}</div>
          )}
          <span className="text-body fs-9 form-icon">
            <FontAwesomeIcon icon={faUser} />
          </span>
        </div>
      </div>

      <div className="mb-3 text-start">
        <label className="form-label">Contraseña</label>
        <div className="form-icon-container">
          <input
            className="form-control form-icon-input"
            id="password"
            type="password"
            placeholder="Contraseña"
            {...register('password')}
          />
          {errors.password && (
            <div className="text-danger fs-9 fw-bolder">{errors.password.message}</div>
          )}
          <span className={`text-body fs-9 form-icon`}>
            <FontAwesomeIcon icon={faKey} />
          </span>
        </div>
      </div>

      <div className="row flex-between-center mb-7">
        <div className="col-auto">
          <div className="form-check mb-0">
            <input
              className="form-check-input"
              id="basic-checkbox"
              type="checkbox"
            />
            <label className="form-check-label mb-0">Recordarme</label>
          </div>
        </div>

        <div className="col-auto">
          <Link className="fs-9 fw-semibold" href="/forgot-password">
            ¿Olvidó su contraseña?
          </Link>
        </div>
      </div>

      <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center">
            <span className="mx-2">Iniciando sesión</span>
            <div className="spinner-border spinner-border-sm" role="status">
            </div>
          </div>
        ) : (
          'Iniciar sesión'
        )}
      </button>

    </form>
  );
}