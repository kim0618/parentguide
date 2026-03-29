import type { ReactNode } from 'react';

type BadgeVariant = 'blue' | 'green' | 'amber' | 'gray';

interface Props {
  variant?: BadgeVariant;
  children: ReactNode;
  className?: string;
}

const VARIANT_CLASS: Record<BadgeVariant, string> = {
  blue:  'badge-blue',
  green: 'badge-green',
  amber: 'badge-amber',
  gray:  'badge-gray',
};

export default function Badge({ variant = 'blue', children, className }: Props) {
  return (
    <span className={`${VARIANT_CLASS[variant]}${className ? ` ${className}` : ''}`}>
      {children}
    </span>
  );
}
