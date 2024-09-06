import AnimatedImage from './client-components/AnimatedImage'

export default function Home() {
  return (
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div>
        <h1 className="text-4xl font-bold text-center">Week 2</h1>
        <p className="text-center py-5">
          Click on the image to proceed.
          <br />
          Best experienced with headphones.
        </p>
      </div>
      <AnimatedImage
        defaultImage="/images/bongo.default.png"
        hoverImage="/images/bongo.onHover.png"
        clickedImage="/images/bongo.onClick.png"
        navigateTo="/week2-page"
        audioSrc="/audio/bongo.wav"
        className="shadow-md rounded-3xl"
        alt="Interactive Image"
        width={400}
        height={400}
      />
    </div>
  )
}
