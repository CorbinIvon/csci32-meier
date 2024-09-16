export enum Variant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export function getVariantBackgroundStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'bg-blue-600'
    case Variant.SECONDARY:
      return 'bg-gray-600'
    case Variant.TERTIARY:
      return 'bg-gray-300'
  }
}

export function getVariantOutlineStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'border border-blue-600'
    case Variant.SECONDARY:
      return 'border border-gray-600'
    case Variant.TERTIARY:
      return 'border border-gray-300'
  }
}

export function getVariantBorderStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'border-2 border-blue-600'
    case Variant.SECONDARY:
      return 'border-2 border-gray-600'
    case Variant.TERTIARY:
      return 'border-2 border-gray-300'
  }
}

export function getVariantInputTextStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'text-black'
    case Variant.SECONDARY:
      return 'text-black'
    case Variant.TERTIARY:
      return 'text-black'
  }
}
