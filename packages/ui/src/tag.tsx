import classNames from 'classnames'
import { getVariantBackgroundStyles, getVariantButtonTextStyles, Variant } from './variant'
import { getCommonButtonStyles } from './tokens'
import { getSizeStyles, Size } from './size'

export type TagProps = {
  children: React.ReactNode
  onClickX?: () => void
  className?: string
  variant?: Variant
}

export function Tag({ children, className, variant = Variant.PRIMARY, onClickX }: TagProps) {
  const tagBackgroundStyles = getVariantBackgroundStyles(variant)
  const tagTextStyles = getVariantButtonTextStyles(variant)
  const tagButtonStyles = getCommonButtonStyles()
  const tagSizeStyles = getSizeStyles(Size.XSMALL)
  return (
    <div
      className={classNames(
        'flex items-center justify-between px-2 py-1 rounded-full',
        tagBackgroundStyles,
        tagTextStyles,
        tagButtonStyles,
        tagSizeStyles,
        className,
      )}
    >
      <span>{children}</span>
      {onClickX && (
        <button onClick={onClickX} className={classNames('text-xs font-bold', tagTextStyles)}>
          &times;
        </button>
      )}
    </div>
  )
}
