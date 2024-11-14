import classNames from 'classnames'

export type FieldProps = {
  children: React.ReactNode
  className?: string
}

export function FieldGroup({ children, className = '' }: FieldProps) {
  return <div className={classNames('flex flex-col gap-4 mb-2', className)}>{children}</div>
}
