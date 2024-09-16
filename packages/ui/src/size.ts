export enum Size {
  SMALL,
  MEDIUM,
  LARGE,
}

export function getSizeStyles(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 'px-2 py-1'
    case Size.MEDIUM:
      return 'px-4 py-2'
    case Size.LARGE:
      return 'px-6 py-3'
  }
}

export function getInputSizeStyles(size: Size) {
  switch (size) {
    case Size.SMALL:
      return 'px-2 py-1 rounded shadow'
    case Size.MEDIUM:
      return 'px-3 py-1.5 rpimded-md shadow-md'
    case Size.LARGE:
      return 'px-4 py-2 rounded-lg shadow-lg'
  }
}
