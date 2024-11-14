import classNames from 'classnames'

export type HeaderProps = {
  children: React.ReactNode
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  className?: string
}

export function Header({ variant, children, className = '' }: HeaderProps) {
  return variant === 'h1' ? (
    <h1 className={classNames('text-4xl font-bold', className)}>{children}</h1>
  ) : variant === 'h2' ? (
    <h2 className={classNames('text-3xl font-bold', className)}>{children}</h2>
  ) : variant === 'h3' ? (
    <h3 className={classNames('text-2xl font-bold', className)}>{children}</h3>
  ) : variant === 'h4' ? (
    <h4 className={classNames('text-xl font-bold', className)}>{children}</h4>
  ) : variant === 'h5' ? (
    <h5 className={classNames('text-lg font-bold', className)}>{children}</h5>
  ) : variant === 'h6' ? (
    <h6 className={classNames('text-base font-bold', className)}>{children}</h6>
  ) : null
}
