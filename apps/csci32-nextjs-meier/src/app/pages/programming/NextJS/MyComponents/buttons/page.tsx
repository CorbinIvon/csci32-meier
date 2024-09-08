import { Button } from '@repo/ui/src/button'

export default function ButtonPage() {
  return (
    <div>
      <Button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        alertString="Alert message!"
      >
        Button with Alert message!
      </Button>
    </div>
  )
}
