export enum Variant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
  ERROR, // Added ERROR
  ALERT, // Added ALERT
}

export function getVariantBackgroundStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'bg-blue-200 hover:bg-blue-300 active:bg-blue-400'
    case Variant.SECONDARY:
      return 'bg-gray-200 hover:bg-gray-300 active:bg-gray-400'
    case Variant.TERTIARY:
      return 'bg-gray-50 hover:bg-gray-200 active:bg-gray-300'
    case Variant.ERROR: // Added case for ERROR
      return 'bg-red-600 hover:bg-red-700 active:bg-red-800'
    case Variant.ALERT: // Added case for ALERT
      return 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
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
    case Variant.ERROR: // Added case for ERROR
      return 'outline-red-600'
    case Variant.ALERT: // Added case for ALERT
      return 'outline-amber-600'
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
    case Variant.ERROR: // Added case for ERROR
      return 'border-2 border-red-600'
    case Variant.ALERT: // Added case for ALERT
      return 'border-2 border-amber-600'
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
    case Variant.ERROR: // Added case for ERROR
      return 'text-black'
    case Variant.ALERT: // Added case for ALERT
      return 'text-black'
  }
}

export function getVariantButtonTextStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'text-white'
    case Variant.SECONDARY:
      return 'text-white'
    case Variant.TERTIARY:
      return 'text-black'
    case Variant.ERROR: // Added case for ERROR
      return 'text-white'
    case Variant.ALERT: // Added case for ALERT
      return 'text-white'
  }
}
