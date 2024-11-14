import classNames from 'classnames'

export type WrapperProps = {
  children: React.ReactNode
  className?: string
}

export function Wrapper({ children, className = '' }: WrapperProps): JSX.Element {
  return <div className={classNames('p-12 max-w-screen-xl mx-auto min-w-96', className)}>{children}</div>
}
