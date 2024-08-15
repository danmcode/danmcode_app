import { clsx } from 'clsx';
import Link from 'next/link';

interface Breadcrumb {
  label: string;
  href: string;
  active?: boolean;
}



export default function Breadcrumbs({
  breadcrumbs,
  pageTitle,
}: {
  breadcrumbs: Breadcrumb[];
  pageTitle: string;
}) {
  return (
    <div>

      <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-2">
          {breadcrumbs.map((breadcrumb) => (
            <li
              key={breadcrumb.href}
              aria-current={breadcrumb.active}
              className='breadcrumb-item'
            >
              <Link className={`${breadcrumb.active ? 'breadcrumb-item active disabled' : 'breadcrumb-item'}`} href={breadcrumb.href}>{breadcrumb.label}</Link>

            </li>
          ))}
        </ol>
      </nav>
      <h2 className="text-bold text-body-emphasis mb-5"> { pageTitle } </h2>
    </div>

  );
}
