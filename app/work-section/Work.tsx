import type { Project } from '../lib/projects'
import ProjectGrid from './ProjectGrid'

const Work = ({ projects }: { projects: Project[] }) => {
  return (
    <section
      className="relative z-10 flex w-full flex-col items-center justify-center bg-primary bg-cover bg-center py-16 md:py-20 lg:py-20"
      id="work"
    >
      <h2 className="mb-10 hidden text-[36px] text-[#e4ded7] md:mb-16 md:text-[42px] lg:mb-16 lg:text-[72px]">
        Featured Work
      </h2>

      <ProjectGrid projects={projects} />
    </section>
  )
}

export default Work
