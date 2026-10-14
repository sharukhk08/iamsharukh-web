import type { Project } from '../lib/projects'
import ProjectCard from './ProjectCard'

const ProjectGrid = ({ projects }: { projects: Project[] }) => {
  return (
    <>
      <div className="grid w-[90%] grid-cols-1 gap-y-10 gap-x-6 lg:max-w-[1200px] lg:grid-cols-1">
        {projects.map((project, index) => (
          <ProjectCard
            id={index}
            key={project.slug}
            name={project.name}
            description={project.summary}
            technologies={project.technologies}
            github={project.repoUrl ?? ''}
            demo={project.liveUrl ?? ''}
            image={project.cover}
            available={!project.comingSoon}
          />
        ))}
      </div>
    </>
  )
}

export default ProjectGrid
