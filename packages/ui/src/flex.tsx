import classNames from 'classnames'

export type FlexProps = {
  className?: string
  children: React.ReactNode
}

export function Flex({ className = '', children }: FlexProps) {
  return <div className={classNames('flex', className)}>{children}</div>
}
