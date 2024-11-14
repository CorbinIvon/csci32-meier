import classNames from 'classnames'

export type FieldProps = {
  children: React.ReactNode
  className?: string
}

export function Field({ children, className = '' }: FieldProps) {
  return <div className={classNames('flex flex-col gap-2 items-center', className)}>{children}</div>
}
