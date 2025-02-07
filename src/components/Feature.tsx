import Image from 'next/image'
import PokemonGameFeature from './other'
import { MotionDiv, MotionH2, MotionP } from './MotionDiv'

const Feature = () => {
  return (
    <div>
      <section id="support-me" className="container relative md:w-[90%] mx-auto my-12 p-8 flex flex-col items-center justify-center bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 rounded-lg border-2 border-white text-center">
        <MotionDiv
          className="relative mx-auto max-w-5xl text-center flex flex-col items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <MotionDiv
            className="w-20 mb-2"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <Image
              src="/favicon.jpg"
              alt="Monster Pedia Logo"
              width={80}
              height={80}
              quality={100}
              loading="lazy"
            />
          </MotionDiv>
          <MotionH2
            className="block w-full bg-gradient-to-b text-white bg-clip-text font-bold text-transparent text-3xl sm:text-4xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Similar Projects
          </MotionH2>
          <MotionP
            className="mx-auto my-4 w-full max-w-xl bg-transparent text-center md:text-center font-medium leading-relaxed tracking-wide text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            Discover <span className='font-bold'>Dream Mist</span>, My other exciting Pokémon game project for browser created using HTML canvas.
          </MotionP>
        </MotionDiv>
        
        <div className='z-50'>
          <PokemonGameFeature />
        </div>

        <MotionDiv
          initial={{ opacity: 0.4 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
          viewport={{ once: true }}
        >
          <div className="absolute bottom-0 left-0 md:block opacity-90">
            <Image
              src="/mist4.webp"
              alt="Mist"
              width={1200}
              height={1200}
              className='opacity-20 blur-md w-full'
              loading='lazy'
              quality={100}
            />
          </div>
          <div className="absolute bottom-0 left-0 md:block opacity-90">
            <Image
              src="/mist4.webp"
              alt="Mist"
              height={1200}
              width={1200}
              className='opacity-15 blur-md w-2/3'
              loading='lazy'
              quality={100}
            />
          </div>
          <div className="absolute bottom-0 left-0 md:block opacity-90">
            <Image
              src="/mist.webp"
              alt="Mist"
              height={1200}
              width={1200}
              loading='lazy'
              className='opacity-10 blur-md w-96'
              quality={100}
            />
          </div>
        </MotionDiv>
      </section>
    </div>
  )
}

export default Feature
