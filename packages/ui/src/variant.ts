export enum Variant {
  PRIMARY,
  SECONDARY,
  TERTIARY,
}

export default function getVariantStyles(variant: Variant) {
  switch (variant) {
    case Variant.PRIMARY:
      return 'bg-blue-600 text-white hover:bg-blue-700 active:bg-blue-800'
    case Variant.SECONDARY:
      return 'bg-gray-600 text-white hover:bg-gray-700 active:bg-gray-800'
    case Variant.TERTIARY:
      return 'bg-gray-300 text-gray-800 hover:bg-gray-400 active:bg-gray-500'
  }
}
