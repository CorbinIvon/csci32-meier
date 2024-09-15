export enum Size {
  SMALL,
  MEDIUM,
  LARGE,
}

export default function getSizeStyles(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 'px-2 py-1'
    case Size.MEDIUM:
      return 'px-4 py-2'
    case Size.LARGE:
      return 'px-6 py-3'
  }
}
