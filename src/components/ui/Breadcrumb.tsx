import { Fragment } from 'react';
import Link from 'next/link';

export interface BreadcrumbItem {
  label: string;
  /** href가 없으면 현재 페이지 (링크 없이 텍스트만 표시) */
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
  className?: string;
}

export default function Breadcrumb({ items, className = '' }: Props) {
  return (
    <nav
      aria-label="위치"
      className={`flex items-center gap-1.5 text-sm text-gray-500 ${className}`}
    >
      {items.map((item, i) => (
        <Fragment key={item.label}>
          {i > 0 && (
            <span aria-hidden="true" className="select-none">
              /
            </span>
          )}
          {item.href ? (
            <Link
              href={item.href}
              className="no-underline text-gray-500 hover:text-blue-700"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-medium text-gray-800">{item.label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
