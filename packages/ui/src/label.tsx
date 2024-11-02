export type LabelProps = {
  children: React.ReactNode
  htmlFor?: string
}

export function Label({ children, htmlFor }: LabelProps) {
  return (
    <label className="text-lg font-bold w-full" htmlFor={htmlFor}>
      {children}
    </label>
  )
}
