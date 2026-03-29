import type { ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'default' | 'sm';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: 'btn-primary',
  outline: 'btn-outline',
  ghost:   'btn-ghost',
};

const SIZE_CLASS: Record<ButtonSize, string> = {
  default: '',
  sm:      'btn-sm',
};

export default function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  children,
  ...rest
}: Props) {
  const base = size === 'sm' ? SIZE_CLASS.sm : VARIANT_CLASS[variant];
  return (
    <button className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </button>
  );
}
