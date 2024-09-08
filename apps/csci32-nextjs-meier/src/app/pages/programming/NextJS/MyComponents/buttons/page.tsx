import { Button } from '@repo/ui/src/button'
import { Size } from '@repo/ui/src/size'
import { Variant } from '@repo/ui/src/variant'

export default function ButtonPage() {
  return (
    <>
      <div>
        <Button size={Size.LARGE} variant={Variant.PRIMARY}>
          LARGE PRIMARY
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.PRIMARY}>
          MEDIUM PRIMARY
        </Button>
        <Button size={Size.SMALL} variant={Variant.PRIMARY}>
          SMALL PRIMARY
        </Button>
      </div>
      <div>
        <Button size={Size.LARGE} variant={Variant.SECONDARY}>
          LARGE SECONDARY
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.SECONDARY}>
          MEDIUM SECONDARY
        </Button>
        <Button size={Size.SMALL} variant={Variant.SECONDARY}>
          SMALL SECONDARY
        </Button>{' '}
      </div>
      <div>
        <Button size={Size.LARGE} variant={Variant.TERTIARY}>
          LARGE TERTIARY
        </Button>
        <Button size={Size.MEDIUM} variant={Variant.TERTIARY}>
          MEDIUM TERTIARY
        </Button>
        <Button size={Size.SMALL} variant={Variant.TERTIARY}>
          SMALL TERTIARY
        </Button>{' '}
      </div>
    </>
  )
}
