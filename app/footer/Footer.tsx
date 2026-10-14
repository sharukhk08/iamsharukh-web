import Link from 'next/link'
import { motion } from 'framer-motion'
import AnimatedBody from '../animations/AnimatedBody'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <motion.section
      className=" min-h-[15vh] w-full  items-center justify-center border-t-[3px] border-ink/30 bg-primary pt-10  font-bold uppercase md:min-h-[20vh] md:py-16 lg:min-h-[10vh] lg:pt-6 lg:pb-0"
      initial="initial"
      animate="animate"
    >
      <motion.div className="mx-auto flex w-[90%] flex-row items-center justify-between text-center text-[12px] text-ink sm:text-[12px] md:text-[14px] lg:max-w-[1440px] lg:text-[14px]">
        <div className="flex flex-col gap-1 text-left sm:flex-row sm:gap-4">
          <AnimatedBody text={`Copyright ${year}`} className={'m-0 p-0'} />
          <Link href="/services" className="underline underline-offset-2 hover:no-underline">
            Services
          </Link>
          <Link href="/about" className="underline underline-offset-2 hover:no-underline">
            About
          </Link>
          <Link href="/privacy" className="underline underline-offset-2 hover:no-underline">
            Privacy
          </Link>
          <Link href="/locations/hisar" className="underline underline-offset-2 hover:no-underline">
            Hisar
          </Link>
          <Link href="/locations" className="underline underline-offset-2 hover:no-underline">
            Locations
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row  sm:gap-1 md:gap-2">
          <AnimatedBody
            text={'Design & Development by'}
            className={'m-0 p-0'}
          />
          <Link
            href="https://github.com/sharukhk08"
            target="_blank"
            aria-label="View GitHub Profile"
          >
            <span className="underline underline-offset-2 hover:no-underline">
              <AnimatedBody text={'Sharukh Khan'} className={'m-0 p-0'} />
            </span>{' '}
          </Link>
        </div>
      </motion.div>
    </motion.section>
  )
}

export default Footer
