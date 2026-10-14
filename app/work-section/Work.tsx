import type { Project } from '../lib/projects'
import SectionHeading from '../components/SectionHeading'
import ProjectGrid from './ProjectGrid'

const Work = ({ projects }: { projects: Project[] }) => {
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center justify-center bg-primary bg-cover bg-center py-16 md:py-20 lg:py-20"
      id="work"
    >
      <div className="mb-10 w-[90%] md:mb-16 lg:max-w-[1200px]">
        <SectionHeading
          title="Featured work"
          intro="A selection of projects I have designed and built."
        />
      </div>

      <ProjectGrid projects={projects} />
    </section>
  )
}

export default Work
