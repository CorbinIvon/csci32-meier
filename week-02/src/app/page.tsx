import Image from 'next/image'

export default function Home() {
  return (
    <a href="/week2-page">
      <Image src="/images/week2.jpg" alt="Week 2" width={500} height={500} />
    </a>
  )
}
