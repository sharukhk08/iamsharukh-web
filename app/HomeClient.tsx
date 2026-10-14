'use client'
import useBlobity from 'blobity/lib/react/useBlobity'
import { Suspense, useEffect, useState } from 'react'
import PreLoader from './animations/PreLoader/PreLoader'
import Hero from './hero-section/Hero'
import NavBar from './navbar/NavBar'
import { initialBlobityOptions } from './utils/BlobityConfig'
import ContactFormModal from './contact-section/ContactFormModal'
import ServiceDeepLink from './contact-section/ServiceDeepLink'

import dynamic from 'next/dynamic'
import type { Project } from './lib/projects'
import Reviews from './reviews-section/ReviewGrid'
import ServicesSection from './services-section/ServicesSection'
import LearnTeaser from './services-section/LearnTeaser'
import LatestPosts from './services-section/LatestPosts'
import ExploreSection from './services-section/ExploreSection'
const Work = dynamic(() => import('./work-section/Work'))
const About = dynamic(() => import('./about-section/About'))
const Contact = dynamic(() => import('./contact-section/Contact'))
const Footer = dynamic(() => import('./footer/Footer'))

type HomeClientProps = {
  projects: Project[]
  // Plain data for the home page teaser, read on the server.
  posts: { slug: string; title: string; description: string; date: string }[]
}

export default function HomeClient({ projects, posts }: HomeClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [initialService, setInitialService] = useState<string | undefined>()
  const blobityInstance = useBlobity(initialBlobityOptions)

  useEffect(() => {
    if (blobityInstance.current) {
      // @ts-ignore for debugging purposes or playing around
      window.blobity = blobityInstance.current
    }
  }, [blobityInstance])

  // The hook never removes the cursor effect. Without this it keeps running on
  // every other page after you navigate away from the home page, drawing outlines
  // around links, buttons and list items.
  useEffect(() => {
    const instance = blobityInstance
    return () => {
      instance.current?.destroy()
      instance.current = null
      // @ts-ignore see above
      delete window.blobity
    }
  }, [blobityInstance])

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
    })
  }, [])

  return (
    <>
      <PreLoader />
      <Suspense fallback={null}>
        <ServiceDeepLink
          onService={(service) => {
            setInitialService(service)
            setIsModalOpen(true)
          }}
        />
      </Suspense>
      <NavBar />

      <main className="flex flex-col items-center justify-center">
        <Hero onContactClick={() => setIsModalOpen(true)} />
        <Work projects={projects} />
        <ServicesSection />
        <LearnTeaser />
        <Reviews />
        <About />
        <LatestPosts posts={posts} />
        <ExploreSection />
        <Contact onContactClick={() => setIsModalOpen(true)} />
        <Footer />
      </main>

      <ContactFormModal
        isOpen={isModalOpen}
        initialService={initialService}
        onClose={() => {
          setIsModalOpen(false)
          setInitialService(undefined)
        }}
      />
    </>
  )
}
