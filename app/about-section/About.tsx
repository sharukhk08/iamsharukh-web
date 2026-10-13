import SongCarousel from './SongCarousel'
import '../animations/animate.css'
import AnimatedBody from '../animations/AnimatedBody'
import AnimatedTitle from '../animations/AnimatedTitle'

const About = () => {
  return (
    <section
      className="relative z-10 w-full items-center justify-center overflow-hidden bg-primary bg-cover bg-center pt-16 pb-36 md:pt-20 md:pb-44 lg:pt-20 lg:pb-56"
      id="about"
    >
      <div className="mx-auto flex w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px]">
        <AnimatedTitle
          text={
            'CRAFTING DIGITAL EXPERIENCES THAT BLEND INNOVATION WITH PERFORMANCE'
          }
          className={
            'mb-10 text-left text-[40px] font-bold leading-[0.9em] tracking-tighter text-[#e4ded7] sm:text-[45px] md:mb-16 md:text-[60px] lg:text-[80px]'
          }
          wordSpace={'mr-[14px]'}
          charSpace={'mr-[0.001em]'}
        />

        <div className="mx-auto flex w-[100%] flex-col lg:max-w-[1200px] lg:flex-row lg:gap-20">
          {/* Main content section */}
          <div className="mb-10 flex w-[100%] flex-col gap-4 text-[18px] font-medium leading-relaxed tracking-wide text-[#e4ded7] md:mb-16 md:gap-6 md:text-[20px] md:leading-relaxed lg:mb-16 lg:max-w-[90%] lg:text-[24px]">
            <AnimatedBody text="I am a full-stack developer and software engineer with 7 years of experience building websites, web applications and mobile apps with Next.js, React, React Native and Node.js, from Figma design to a launched product." />
            <AnimatedBody text="As co-founder and CTO of Innovaft in Hisar, I lead the technical side of client projects. I also mentor students: 50+ trained so far, 10 of them placed in jobs." />
            <AnimatedBody text="My approach combines technical expertise with clear planning and communication, so each project meets both user needs and business goals. I care about performance and about software that is simple to use." />
          </div>

          {/* Skills section */}
          <div className="mb-24 flex w-[100%] flex-col gap-4 text-[18px] font-normal leading-relaxed tracking-wide text-[#e4ded7]/80 sm:mb-32 md:mb-40 md:gap-6 md:text-[16px] md:leading-normal lg:mt-0 lg:mb-16 lg:max-w-[30%] lg:text-[18px]">
            <div className="flex flex-col gap-4 md:gap-3">
              <AnimatedTitle
                text={'Technical Expertise'}
                className={
                  'text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]'
                }
                wordSpace={'mr-[0.25em]'}
                charSpace={'mr-[0.01em]'}
              />
              <AnimatedBody
                text={
                  'JavaScript (ES6+), TypeScript, React, Next.js, React Native, Redux Toolkit, Node JS, MongoDB, Firebase, Strapi, Git/GitHub, CI/CD'
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={'UI Development'}
                className={
                  'text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]'
                }
                wordSpace={'mr-[0.25em]'}
                charSpace={'mr-[0.01em]'}
              />
              <AnimatedBody
                text={
                  'Tailwind CSS, Material UI, Framer Motion, GSAP, Styled Components, CSS3/SCSS, Responsive Design, Performance Optimization'
                }
              />
            </div>

            <div className="flex flex-col gap-3">
              <AnimatedTitle
                text={'Leadership'}
                className={
                  'text-[24px] text-[#e4ded7] md:text-[30px] lg:text-[20px]'
                }
                wordSpace={'mr-[0.25em]'}
                charSpace={'mr-[0.01em]'}
              />
              <AnimatedBody
                text={
                  'System Architecture, Project Management, Team Leadership, Mentoring, Agile Methodologies, UI/UX Design Principles'
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-10 flex flex-col md:-mt-0 lg:mt-28">
        <SongCarousel />
        <AnimatedBody
          text="A curated playlist featuring some of my favorite artists across Hindi, Punjabi, and English - the perfect soundtrack for coding sessions and creative work."
          className="absolute bottom-10 right-0 left-0 mx-auto w-[90%] text-center text-[14px] font-semibold uppercase text-[#e4ded7] sm:w-[500px] md:bottom-12 md:w-[550px] md:text-[16px]"
        />
      </div>
    </section>
  )
}

export default About
